import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({

        appkey: "77bcc4551802ffa146ab8e6ec15d7063",
        libraries: ["clusterer", "drawing", "services"],
    })
}