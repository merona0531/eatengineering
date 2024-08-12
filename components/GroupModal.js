import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 93.5%;
    padding: 10px;
  margin-top: 10px;
    margin-bottom: 20px;
    border: 2px solid #FFBD43;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #FFBD43;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const GroupModal = ({ onClose, onSave }) => {
    const [groupName, setGroupName] = useState('');

    const handleSave = () => {
        onSave(groupName);
        onClose();
    };

    return (
        <ModalWrapper>
            <ModalContent>
                <h2>그룹명 입력</h2>
                <Input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="그룹명을 입력하세요"
                />
                <Button onClick={handleSave}>완료</Button>
                <Button onClick={onClose} style={{ marginLeft: '10px' }}>취소</Button>
            </ModalContent>
        </ModalWrapper>
    );
};

export default GroupModal;
