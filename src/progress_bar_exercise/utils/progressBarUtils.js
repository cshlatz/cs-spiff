const calculateWidthByBreakpoints = (percentageFilled, breakpoints) => {
  let maxBreakpointHit = Math.max(...breakpoints.filter(num => num <= percentageFilled));
  // Hacky fix to make sure the bar doesn't shoot out to infinity
  if (isNaN(maxBreakpointHit) || maxBreakpointHit <= 0) {
      return 0;
  }

  return maxBreakpointHit;
}

export {
  calculateWidthByBreakpoints
}
