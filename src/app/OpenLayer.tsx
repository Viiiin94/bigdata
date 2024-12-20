// import { useRef, useEffect } from "react";
// import Map from "ol/Map.js";
// import OSM from "ol/source/OSM.js";
// import TileLayer from "ol/layer/Tile.js";
// import View from "ol/View.js";
// import { fromLonLat } from "ol/proj";
// import "ol/ol.css";

// const OpenLayer = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     // 지도를 초기화
//     const map = new Map({
//       target: mapRef.current, // useRef, ref의 타겟이 된 div와 타입 호환이 안되서 Map.d.ts target 에 null 타입 추가
//       layers: [
//         new TileLayer({
//           source: new OSM(),
//         }),
//       ],
//       view: new View({
//         center: fromLonLat([126.9706, 37.5546]),
//         zoom: 15,
//       }),
//     });

//     // 컴포넌트 언마운트 시 지도 정리
//     return () => {
//       map.setTarget();
//     };
//   }, []);
//   return (
//     <div>
//       <div
//         id="map"
//         ref={mapRef}
//         style={{ width: "1200px", height: "500px" }}
//       ></div>
//     </div>
//   );
// };

// export default OpenLayer;
