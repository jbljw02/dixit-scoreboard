const getTotal = (values: number[]) => values.reduce((sum, value) => sum + value, 0);

export default getTotal;