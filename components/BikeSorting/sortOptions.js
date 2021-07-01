const sortOptions = {
  fields: [
    { value: 'title', label: 'Bike Name', type: 'string' },
    { value: 'price', label: 'Price', type: 'number' },
    { value: 'motor', label: 'Motor', type: 'number' },
    { value: 'battery', label: 'Battery', type: 'number' },
    { value: 'voltage', label: 'Volts', type: 'number' },
    { value: 'range', label: 'Range', type: 'number' },
    { value: 'top_speed', label: 'Top Speed', type: 'number' },
  ],
  directions: [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
  ],
};

export default sortOptions;
