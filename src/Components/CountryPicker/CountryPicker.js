import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import { fetchCountries } from '../../api'

import styles from './CountryPicker.module.css';

const CountryPicker = ({ handleChange }) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setFetchedCountries(await fetchCountries());
        }

        fetchApi();
    }, [setFetchedCountries]);

    console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect default='' onChange={e => handleChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, indx) => 
                    <option key={indx} value={country}>{country}</option>
                )}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;