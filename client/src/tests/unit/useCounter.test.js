import { renderHook, act } from '@testing-library/react';
import useCounter from '../../hooks/useCounter';

test('should increment counter', () => {
    const { result } = renderHook(() => useCounter(0));
    act(() => {
        result.current.increment();
    });
    expect(result.current.count).toBe(1);
});