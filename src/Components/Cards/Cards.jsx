import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({ data: { cases, recovered, deaths, updated } }) => {
    if (!cases) {
        return 'Loading...'
    }

    const cardComponents = [{
        name: "Infected",
        value: cases,
        text: "Number of active cases of COVID-19",
    },
    {
        name: "Recovered",
        value: recovered,
        text: "Number of recovered cases of COVID-19",
    },
    {
        name: "Deaths",
        value: deaths,
        text: "Number of deaths caused by COVID-19",
    }]

    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                {cardComponents.map((content, indx) => (
                    <Grid item component={Card} xs={12} md={3} key={indx} className={cx(styles.card)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>{content.name}</Typography>
                            <Typography variant="h5">
                                <CountUp
                                    start={0}
                                    end={content.value}
                                    duration={2.5}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">{new Date(updated).toDateString()}</Typography>
                            <Typography variant="body2">{content.text}</Typography>
                        </CardContent>
                    </Grid>
                ))}
            </Grid>
        </div>

    )
}

export default Cards