import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

export default function BarChart ({ data }) {
  return (
    <div className='chart'>
    <ResponsiveBar
      data={data}
      keys={[ 'open', 'closed' ]}
      indexBy='title'
      margin={{ top: 10, right: 80, bottom: 40, left: 20 }}
      padding={0.2}
      groupMode='grouped'
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 2,
            padding: 1,
            stagger: true
        },
        {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
        }
      ]}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={10}
      labelSkipHeight={10}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
      ]}
      role='application'
      ariaLabel='bar chart'
      barAriaLabel={function(e){return e.id+': '+e.formattedValue+' issues: '+e.indexValue}}
    />
    </div>
  );
}
