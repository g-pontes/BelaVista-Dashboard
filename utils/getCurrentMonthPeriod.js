import dayjs from 'dayjs';

export default function () {
  const currentDay = dayjs().format('YYYY-MM-DD');
  const dateFrom30DaysAgo = dayjs().subtract(30, 'day').format('YYYY-MM-DD');

  return {
    currentDay,
    dateFrom30DaysAgo
  }
}

