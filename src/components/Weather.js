import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { DescriptionItem } from './DescriptionItem';
//
const Weather = ({
  applicable_date,
  air_pressure,
  humidity,
  max_temp,
  min_temp,
  the_temp,
  visibility,
  weather_state_abbr,
  weather_state_name,
  wind_speed
}) => {
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={`https://www.metaweather.com/static/img/weather/png/64/${weather_state_abbr}.png`}
        />
        <Card.Header>{applicable_date}</Card.Header>
        <Card.Meta>{weather_state_name}</Card.Meta>
        <Card.Description>
          <DescriptionItem
            label={'Air pressure'}
            value={air_pressure}
            unit="mbar"
          />
          <DescriptionItem label={'Humidity'} value={humidity} unit="%" />
          <DescriptionItem
            label={'Max temperature'}
            value={max_temp}
            unit="C"
          />
          <DescriptionItem
            label={'Min temperature'}
            value={min_temp}
            unit="C"
          />
          <DescriptionItem
            label={'Current temperature'}
            value={the_temp}
            unit="C"
          />
          <DescriptionItem label={'Visibility'} value={visibility} unit="M" />
          <DescriptionItem label={'Wind speed'} value={wind_speed} unit="Mps" />
        </Card.Description>
      </Card.Content>
      <Card.Content extra></Card.Content>
    </Card>
  );
};

export { Weather };
