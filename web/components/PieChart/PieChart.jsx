import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const PieChart = React.memo(({ className, data, textSize = 14}) => {
	const chartRef = useRef(null);
	
	useEffect(() => {
		if (chartRef.current) {
			drawChart(chartRef.current, data, textSize);
		}
		
	}, [chartRef, data, textSize]);
	
	return (
		<div className={className} ref={chartRef}/>
	);
});

PieChart.displayName = 'PieChart';

const drawChart = (element, data, textSize) => {
	const colors = ['#C2185B', '#512DA8', '#1976D2', '#0097A7', '#388E3C', '#AFB42B', '#FFA000', '#E64A19', '#FDD835', '#4CAF50'];
	const boxSize = 500;

	d3.select(element).select('svg').remove(); // Remove the old svg
	// Create new svg
	const svg = d3
		.select(element)
		.append('svg')
		.attr('preserveAspectRatio', 'xMidYMid meet')
		.attr('height', '100%')
		.attr('width', '100%')
		.attr('viewBox', `0 0 ${boxSize} ${boxSize}`)
		.append('g')
		.attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);

	const arcGenerator = d3.arc().cornerRadius(10).padAngle(0.02).innerRadius(75).outerRadius(250);
	const pieGenerator = d3.pie().value((d) => d.count);
	const arcs = svg.selectAll().data(pieGenerator(data)).enter();
	arcs
		.append('path')
		.attr('d', arcGenerator)
		.style('fill', (d, i) => colors[i % data.length])
		.transition()
		.duration(500)
		.attrTween('d', function (d) {
			const i = d3.interpolate(d.startAngle, d.endAngle);
			return function (t) {
				d.endAngle = i(t);
				return arcGenerator(d);
			};
		});

	arcs
		.append('text')
		.attr('text-anchor', 'middle')
		.text((d) => `${d.data.answer}`)
		.style('fill', '#fff')
		.style('font-size', `${textSize}px`)
		.attr('transform', (d) => {
			const [x, y] = arcGenerator.centroid(d);
			return `translate(${x}, ${y})`;
		});
};