// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie

import React from 'react';
// import { dataSet as data } from './data';
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const PieChart = (props) =>{
    const {data} = props;
    console.log(data);
    return(
    <ResponsivePie
        data={data}
        margin={{ top: 0, right: 60, bottom:60 , left: 90 }}
        innerRadius={0.75}
        padAngle={0.7}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'category10' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        arcLinkLabelsTextColor="black"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="black"
    // arcLabelsTextColor={{
    //         from: 'color',
    //         modifiers: [
    //             [
    //                 'darker',
    //                 2
    //             ]
    //         ]
    //     }}

        // isInteractive={false}

        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ammount'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'returns'
                },
                id: 'lines'
            },
        ]}

        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 30,
                translateY: -290,
                itemsSpacing: 0,
                itemWidth: 150,
                itemHeight: 18,
                itemTextColor: '#fff',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#0abb92'
                        }
                    }
                ]
            }
        ]}
    />
    )
    }


export default PieChart;