import { renderHook, act } from '@testing-library/react-hooks'
import useInterval from '../hooks/useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setInterval');
  });

  test('will not call function when delay is null', () => {
    let callback = jest.fn();
    const { interval } = renderHook(() => useInterval(() => {
      callback();
    }, null));
    expect(setInterval).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(3000);
    expect(setInterval).toHaveBeenCalledTimes(0);
  });

  test('will call function when delay is not null', () => {
    let callback = jest.fn();
    const { interval } = renderHook(() => useInterval(() => {
      callback();
    }, 1000));

    expect(setInterval).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(3000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
