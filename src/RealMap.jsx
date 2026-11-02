import React,{useEffect,useRef} from 'react';
export default function RealMap({origin,destination,originCoord,destinationCoord,stops=[]}){
 const container=useRef(null),mapRef=useRef(null);
 useEffect(()=>{
  const L=window.L;if(!L||!container.current){if(container.current)container.current.textContent='Map could not load. Check your internet connection.';return;}
  const map=L.map(container.current,{zoomControl:true,scrollWheelZoom:false}).setView([13.345,74.75],12);
  mapRef.current=map;
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>'}).addTo(map);
  const layer=L.featureGroup().addTo(map);
  stops.forEach(s=>L.circleMarker([s.lat,s.lon],{radius:3,color:'#497c72',weight:1,fillColor:'#d8eee3',fillOpacity:.95}).bindTooltip(s.name).addTo(layer));
  const pins=[];
  if(originCoord){pins.push(L.marker(originCoord,{icon:L.divIcon({className:'route-pin origin-pin',html:'A',iconSize:[30,30],iconAnchor:[15,15]})}).bindPopup('Start · '+origin).addTo(layer));}
  if(destinationCoord){pins.push(L.marker(destinationCoord,{icon:L.divIcon({className:'route-pin destination-pin',html:'B',iconSize:[30,30],iconAnchor:[15,15]})}).bindPopup('Destination · '+destination).addTo(layer));}
  let cancelled=false;
  window.dispatchEvent(new CustomEvent('dd-route',{detail:null}));
  if(originCoord&&destinationCoord){
   map.fitBounds(L.latLngBounds(originCoord,destinationCoord).pad(.28),{maxZoom:13});
   const pair=[originCoord[1],originCoord[0]];
   fetch(`https://router.project-osrm.org/route/v1/driving/${pair.join(',')};${destinationCoord[1]},${destinationCoord[0]}?overview=full&geometries=geojson`)
    .then(r=>{if(!r.ok)throw Error('Route service unavailable');return r.json()})
    .then(data=>{if(cancelled||!data.routes?.length)return;const route=data.routes[0];L.geoJSON(route.geometry,{style:{color:'#267b78',weight:5,opacity:.9}}).addTo(layer);window.dispatchEvent(new CustomEvent('dd-route',{detail:{distance:route.distance,duration:route.duration}}));})
    .catch(()=>{if(!cancelled)window.dispatchEvent(new CustomEvent('dd-route',{detail:{error:true}}))});
  }else if(originCoord){map.setView(originCoord,14)}
  const timer=setTimeout(()=>map.invalidateSize(),150);
  return()=>{cancelled=true;clearTimeout(timer);map.remove();mapRef.current=null};
 },[origin,destination,originCoord?.[0],originCoord?.[1],destinationCoord?.[0],destinationCoord?.[1],stops]);
 return <div className="real-map" ref={container} aria-label="Interactive OpenStreetMap of Udupi and Manipal"/>;
}

