/* eslint-disable complexity */
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { GoogleMapsContext } from '@vis.gl/react-google-maps';

function useCircle(props) {
  const {
    onClick,
    onMouseOver,
    onMouseOut,
    center,
    radius,
    ...circleOptions
  } = props;

  const callbacks = useRef({});
  Object.assign(callbacks.current, {
    onClick,
    onMouseOver,
    onMouseOut,
  });

  const circle = useRef(new google.maps.Circle()).current;

  // Configuramos las opciones iniciales del círculo
  circle.setOptions({
    ...circleOptions,
    center: center, // Centro fijo del círculo
    radius: radius, // Radio fijo del círculo
    draggable: false, // Evita que se pueda arrastrar
    editable: false, // Evita que se pueda cambiar el radio
  });

  const map = useContext(GoogleMapsContext)?.map;

  // Creamos la instancia del círculo y la agregamos al mapa
  useEffect(() => {
    if (!map) {
      if (map === undefined) {
        console.error('<Circle> tiene que estar dentro de un componente Map.');
      }
      return;
    }

    circle.setMap(map);

    return () => {
      circle.setMap(null); // Elimina el círculo del mapa al desmontarlo
    };
  }, [map]);

  // Adjuntamos manejadores de eventos relevantes
  useEffect(() => {
    if (!circle) return;

    const gme = google.maps.event;

    [
      ['click', 'onClick'],
      ['mouseover', 'onMouseOver'],
      ['mouseout', 'onMouseOut'],
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(circle, eventName, (e) => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(circle); // Limpia los eventos al desmontar el círculo
    };
  }, [circle]);

  return circle;
}

/**
 * Componente para renderizar un círculo estático en un mapa
 */
export const Circle = forwardRef((props, ref) => {
  const circle = useCircle(props);

  useImperativeHandle(ref, () => circle);

  return null;
});