import { calculateWidthByBreakpoints } from '../utils/progressBarUtils';

describe('calculateWidthByBreakpoints', () => {
    test('returns expected values given a normal ordered array', () => {
        const breakpoints = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

        for (let i = 0; i < 100; i++) {
            let calculatedWidth = calculateWidthByBreakpoints(i, breakpoints);

            if (calculatedWidth > 0) {
                expect(breakpoints).toContain(calculatedWidth);
            } else {
                expect(calculatedWidth).toBe(0);
            }
        }
    })

    test('returns expected values given an unordered array', () => {
        const breakpoints = [10, 20, 30, 22, 52, 21, 77, 99, 90, 100];

        for (let i = 0; i < 100; i++) {
            let calculatedWidth = calculateWidthByBreakpoints(i, breakpoints);

            if (calculatedWidth > 0) {
                expect(breakpoints).toContain(calculatedWidth);
            } else {
                expect(calculatedWidth).toBe(0);
            }
        }
    })

    test('returns expected values given an unordered bad array', () => {
        const breakpoints = [-1, 10, 20, 30, 22, 52, 21, "seventy seven", 99, 90, 100];

        for (let i = 0; i < 100; i++) {
            let calculatedWidth = calculateWidthByBreakpoints(i, breakpoints);

            if (calculatedWidth > 0) {
                expect(breakpoints).toContain(calculatedWidth);
            } else {
                expect(calculatedWidth).toBe(0);
            }
        }
    })
});
