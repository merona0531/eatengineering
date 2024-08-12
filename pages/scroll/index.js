import React, { useState, useEffect } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import styled from 'styled-components';
import { Reset } from 'styled-reset'
import {
    StyledCarousel,
    StyledCard,
    StyledCardContainer,
    StyledNavRight,
    StyledApp,
    StyledNavLeft
} from './scrollPageStyle';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => (
    <StyledCard>
        <h2>{title}</h2>
        <p>{content}</p>
    </StyledCard>
);

const Carousel = ({ children, active, setActive }) => {
    const count = children.length;

    const handlePrev = () => {
        setActive(active === 1 ? count : active - 1);
    };

    const handleNext = () => {
        setActive(active === count ? 1 : active + 1);
    };

    return (
        <>
            <Reset/>
            <StyledNavLeft onClick={handlePrev}>
                <TiChevronLeftOutline />
            </StyledNavLeft>
            <StyledCarousel>
                {children.map((child, i) => (
                    <StyledCardContainer
                        key={i}
                        style={{
                            '--active': i + 1 === active ? 1 : 0,
                            '--offset': (active - (i + 1)) / 3,
                            '--direction': Math.sign(active - (i + 1)),
                            '--abs-offset': Math.abs(active - (i + 1)) / 3,
                            'pointer-events': active === i + 1 ? 'auto' : 'none',
                            opacity: Math.abs(active - (i + 1)) >= MAX_VISIBILITY ? '0' : '1',
                            display: Math.abs(active - (i + 1)) > MAX_VISIBILITY ? 'none' : 'block'
                        }}
                    >
                        {child}
                    </StyledCardContainer>
                ))}
            </StyledCarousel>
            <StyledNavRight onClick={handleNext}>
                <TiChevronRightOutline />
            </StyledNavRight>
        </>
    );
};

const App = () => {
    const [active, setActive] = useState(1);

    useEffect(() => {
        const body = document.body;
        const appRoot = document.createElement('div');
        body.appendChild(appRoot);

        return () => {
            body.removeChild(appRoot);
        };
    }, []);

    return (
        <StyledApp>
            <Carousel active={active} setActive={setActive} children>
                {[...new Array(CARDS)].map((_, i) => (
                    <Card
                        key={i}
                        title={'사용자 ' + (i + 1)}
                        content="사---진"
                    />
                ))}
            </Carousel>
        </StyledApp>
    );
};

export default App;