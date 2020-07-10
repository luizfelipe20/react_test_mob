import React, { useState, useEffect, useCallback } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import Button from '../../components/Button';
import api from '../../service/api';

import BakeryShop from '../../assets/bakery-shop.png';
import House from '../../assets/house-icon.png';
import { Header, Title, ButtonContainer } from './styles';

function ShowMap() {
  const [points, setPoints] = useState([]);

  const [zoom, setZoom] = useState(13);

  const [joaoHouse, setJoaoHouse] = useState([-3.7244369, -38.484101]);

  const HouseIcon = L.icon({
    iconUrl: House,
    iconSize: [60, 80],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  const Icon = L.icon({
    iconUrl: BakeryShop,
    iconSize: [80, 80],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });

  const handleSelectDate = useCallback(
    async (day) => {
      try {
        const response = await api.get(`list/${day}`);
        if (response.data.data.length === 0) {
          alert('Ainda nāo existem registros nesse dia.');
          return;
        }
        setPoints(response.data.data);
      } catch (err) {
        alert(`${err.message}`);
      }
    },
    [],
  );

  useEffect(() => {
    const LoadData = async () => {
      const response = await api.get('list/1');
      setPoints(response.data.data);
    };

    LoadData();
  }, []);

  return (
    <div>
      <Header>
        <Title>Trajetória do Joāo</Title>
        <ButtonContainer>
          <Button onClick={() => { handleSelectDate(1) }}>Dia 01</Button>
          <Button onClick={() => { handleSelectDate(2) }}>Dia 02</Button>
          <Button onClick={() => { handleSelectDate(3) }}>Dia 03</Button>
          <Button onClick={() => { handleSelectDate(4) }}>Dia 04</Button>
        </ButtonContainer>
      </Header>
      <Map style={{ height: '100vh' }} center={joaoHouse} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={joaoHouse} icon={HouseIcon}>
          <Popup>
            Casa do Joāo
          </Popup>
        </Marker>
        {
          points.map(point => (
            <Marker position={[point.lat, point.lng]} icon={Icon}>
              <Popup>
                {point.location}
              </Popup>
            </Marker>
          ))
        }
      </Map>
    </div>
  );
}

export default ShowMap;