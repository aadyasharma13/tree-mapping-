'use client';

import { useState, useEffect } from 'react';

const CHART_COLORS = [
  '#2E7D32', // Dark green 
  '#43A047', // Green
  '#66BB6A', // Light green
  '#81C784', // Lighter green
  '#A5D6A7', // Very light green
  '#388E3C', // Forest green
  '#1B5E20', // Deep green
  '#4CAF50', // Material green
  '#7CB342', // Lime green
  '#689F38'  // Olive green
];

const HEALTH_COLORS = {
  excellent: '#2E7D32', // Dark green
  good: '#43A047',      // Green
  fair: '#FFB300',      // Amber
  poor: '#FB8C00',      // Orange
  critical: '#D32F2F'   // Red
};

export default function TreeDistributionChart({ 
  data = null, 
  chartType = 'species',
  title = null
}) {
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    // If real data is provided, use it
    if (data) {
      setChartData(data);
      return;
    }
    
    // Otherwise use mock data for demonstration
    let mockData;
    
    if (chartType === 'species') {
      mockData = {
        species: [
          { name: 'Oak', count: 137 },
          { name: 'Maple', count: 98 },
          { name: 'Pine', count: 82 },
          { name: 'Birch', count: 64 },
          { name: 'Elm', count: 49 },
          { name: 'Cedar', count: 37 },
          { name: 'Ash', count: 31 },
          { name: 'Willow', count: 25 },
          { name: 'Other', count: 53 }
        ],
        total: 576
      };
    } else if (chartType === 'health') {
      mockData = {
        health: [
          { status: 'excellent', count: 187 },
          { status: 'good', count: 243 },
          { status: 'fair', count: 92 },
          { status: 'poor', count: 44 },
          { status: 'critical', count: 10 }
        ],
        total: 576
      };
    } else if (chartType === 'management') {
      mockData = {
        activities: [
          { type: 'watering', count: 158 },
          { type: 'pruning', count: 87 },
          { type: 'fertilizing', count: 54 },
          { type: 'treatment', count: 32 },
          { type: 'mulching', count: 26 },
          { type: 'other', count: 18 }
        ],
        total: 375
      };
    }
    
    setChartData(mockData);
  }, [data, chartType]);
  
  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }
  
  // Prepare data for display based on chart type
  let preparedData = [];
  let chartTitle = title;
  
  if (chartType === 'species' && chartData.species) {
    preparedData = chartData.species.map((species, index) => {
      const percentage = ((species.count / chartData.total) * 100).toFixed(1);
      return {
        name: species.name,
        count: species.count,
        percentage,
        color: CHART_COLORS[index % CHART_COLORS.length]
      };
    });
    if (!chartTitle) chartTitle = 'Tree Species Distribution';
  } 
  else if (chartType === 'health' && chartData.health) {
    preparedData = chartData.health.map((item) => {
      const percentage = ((item.count / chartData.total) * 100).toFixed(1);
      return {
        name: item.status.charAt(0).toUpperCase() + item.status.slice(1), // Capitalize
        count: item.count,
        percentage,
        color: HEALTH_COLORS[item.status]
      };
    });
    if (!chartTitle) chartTitle = 'Tree Health Distribution';
  }
  else if (chartType === 'management' && chartData.activities) {
    preparedData = chartData.activities.map((activity, index) => {
      const percentage = ((activity.count / chartData.total) * 100).toFixed(1);
      return {
        name: activity.type.charAt(0).toUpperCase() + activity.type.slice(1), // Capitalize
        count: activity.count,
        percentage,
        color: CHART_COLORS[index % CHART_COLORS.length]
      };
    });
    if (!chartTitle) chartTitle = 'Management Activities';
  }
  
  // Sort by count, descending
  preparedData.sort((a, b) => b.count - a.count);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{chartTitle}</h3>
      
      <div className="mb-8">
        <div className="h-8 w-full flex rounded-full overflow-hidden">
          {preparedData.map((item, index) => (
            <div 
              key={item.name}
              className="h-full" 
              style={{ 
                backgroundColor: item.color,
                width: `${item.percentage}%`,
                transition: 'width 1s ease-in-out'
              }}
              title={`${item.name}: ${item.count} (${item.percentage}%)`}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {preparedData.map((item) => (
          <div key={item.name} className="flex items-center">
            <div 
              className="h-4 w-4 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            ></div>
            <div className="flex justify-between w-full">
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm font-medium">{item.percentage}% ({item.count})</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <div className="text-center">
          <span className="text-sm text-gray-500">Total:</span>
          <span className="text-xl font-bold text-gray-800 ml-2">{chartData.total}</span>
        </div>
      </div>
    </div>
  );
} 