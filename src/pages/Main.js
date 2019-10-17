/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Input, Grid, Segment, Card } from 'semantic-ui-react';
import { Weather } from '../components/Weather';
import { httpRequest } from '../services/httpRequest';
import { tools } from '../tools/toast';

const Main = props => {
  const [searchName, setSearchName] = useState('');
  const [locationData, setLocationData] = useState('');
  const [weatherData, setWeatherData] = useState('');

  const _PROXY_CORS = 'https://cors-anywhere.herokuapp.com/';
  const _BASE_URL = 'https://www.metaweather.com/api/location/';

  useEffect(() => {
    tools.toast.info('e.g: type Oslo, London, Berlin');
  }, []);

  const onChangeHandler = (e, { value }) => {
    setSearchName(value);
  };
  const handleSearchClick = async () => {
    const url_location = `${_PROXY_CORS}${_BASE_URL}search/?query=${searchName}`;
    const response = await httpRequest.Request(
      url_location,
      {},
      httpRequest.ContentType.ApplicationJson,
      httpRequest.RequestType.GET
    );
    const res_data = httpRequest.asEntityOrNull(response);
    if (res_data && res_data[0]) {
      setLocationData(res_data[0]);
      const { woeid } = res_data[0];
      const url_woeid = `${_PROXY_CORS}${_BASE_URL}/${woeid}`;
      //---
      const response_w = await httpRequest.Request(
        url_woeid,
        {},
        httpRequest.ContentType.ApplicationJson,
        httpRequest.RequestType.GET
      );
      const res_data_w = httpRequest.asEntityOrNull(response_w);
      setWeatherData(res_data_w);
      //---
      console.log(res_data_w);
    } else {
      tools.toast.error('No data available, please try another location');
    }
  };

  const init_location_render = () => {
    return (
      <Segment>
        <div style={styles.locationInfoContainer}>
          <p style={styles.label}>
            Location: <span style={styles.value}>{locationData.title}</span>
          </p>
          <p style={styles.label}>
            Location type:{' '}
            <span style={styles.value}>{locationData.location_type}</span>
          </p>
          <p style={styles.label}>
            Geo :{' '}
            <span style={styles.geoValue}>
              <span style={styles.lat_long}>
                {`Latitude: ( ${
                  locationData.latt_long.split(',')[0]
                } ) - Longitude:( ${locationData.latt_long.split(',')[1]} )`}
              </span>
            </span>
          </p>
        </div>
      </Segment>
    );
  };
  const parent_render = () => {
    return (
      <Segment>
        <div style={styles.locationInfoContainer}>
          <p style={styles.label}>
            {`${weatherData.parent.location_type}: `}
            <span style={styles.value}>{weatherData.parent.title}</span>
          </p>
        </div>
      </Segment>
    );
  };
  const times_render = () => {
    return (
      <Segment>
        <div style={styles.locationInfoContainer}>
          <p style={styles.label}>
            Timezone:
            <span style={styles.value}>{` ${weatherData.timezone}`}</span>
          </p>
          <p style={styles.label}>
            Sun rise:
            <span style={styles.sun_rise}>
              {` on ${tools.formatDate(
                new Date(weatherData.sun_rise)
              )} at ${tools.formatTime(new Date(weatherData.sun_rise))}`}
            </span>
          </p>
          <p style={styles.label}>
            Sun set:
            <span style={styles.sun_set}>
              {` on ${tools.formatDate(
                new Date(weatherData.sun_set)
              )} at ${tools.formatTime(new Date(weatherData.sun_set))}`}
            </span>
          </p>
        </div>
      </Segment>
    );
  };
  return (
    <div>
      <Grid columns="equal">
        <Grid.Column></Grid.Column>
        <Grid.Column width={8}>
          <Input
            style={styles.inputBox}
            fluid
            action={{
              icon: 'search',
              color: 'teal',
              onClick: () => handleSearchClick()
            }}
            onKeyPress={e => {
              if (e.charCode == 13) {
                handleSearchClick();
              }
            }}
            placeholder="Enter your city name..."
            value={searchName}
            onChange={onChangeHandler}
          />
          {locationData && init_location_render()}
          {weatherData && (
            <div>
              {parent_render()}
              {times_render()}
            </div>
          )}
          {weatherData && (
            <Segment>
              <Card.Group>
                {weatherData.consolidated_weather.map((item, i) => {
                  return <Weather key={i} {...item} />;
                })}
              </Card.Group>
            </Segment>
          )}
        </Grid.Column>
        <Grid.Column></Grid.Column>
      </Grid>
    </div>
  );
};

export { Main };

const colors = {
  green: '#33691E',
  black: '#212121',
  blue: '#1A237E',
  cherry: '#880E4F',
  orange: '#FF9800',
  deep_orange: '#FF5722'
};

const styles = {
  inputBox: {
    marginTop: '25px'
  },
  locationInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  label: {
    fontSize: '14',
    fontWeight: '700',
    color: colors.blue
  },
  value: {
    fontSize: '14',
    fontWeight: '400',
    color: colors.black
  },
  geoValue: {
    fontSize: '14',
    fontWeight: '500',
    color: colors.green
  },
  lat_long: {
    fontSize: '14',
    fontWeight: '500',
    color: colors.cherry
  },
  sun_rise: {
    fontSize: '14',
    fontWeight: '400',
    color: colors.orange
  },
  sun_set: {
    fontSize: '14',
    fontWeight: '400',
    color: colors.deep_orange
  }
};
