
import {
  geoTimes,
  geoMiller,
} from "d3-geo-projection"
import {
  geoMercator
} from "d3-geo"

import defaultProjectionConfig from "./projectionConfig"

const projectionReference = {
  mercator: geoMercator,
  miller: geoMiller,
  times: geoTimes,
}

export default function(width, height, config, projectionName) {

  const scale = config.scale || defaultProjectionConfig.scale
  const xOffset = config.xOffset || defaultProjectionConfig.xOffset
  const yOffset = config.yOffset || defaultProjectionConfig.yOffset
  const rotation = config.rotation || defaultProjectionConfig.rotation
  const precision = config.precision || defaultProjectionConfig.precision

  return projectionReference[projectionName]()
      .scale(scale)
      .translate([ xOffset + width / 2, yOffset + height / 2 ])
      .rotate(rotation)
      .precision(precision)
}
