import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const varTypes = {minimum: "Minimum"}

const Chart = (props) => {
  const svgRef = useRef(null);

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/histogram
function ChartSet(data, {
  value = d => d, // convenience alias for x
  domain, // convenience alias for xDomain
  label, // convenience alias for xLabel
  format, // convenience alias for xFormat
  type = d3.scaleLinear, // convenience alias for xType
  x = value, // given d in data, returns the (quantitative) x-value
  y = () => 1, // given d in data, returns the (quantitative) weight
  thresholds = 40, // approximate number of bins to generate, or threshold function
  normalize, // whether to normalize values to a total of 100%
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width of chart, in pixels
  height = 400, // outer height of chart, in pixels
  insetLeft = 0.5, // inset left edge of bar
  insetRight = 0.5, // inset right edge of bar
  xType = type, // type of x-scale
  xDomain = domain, // [xmin, xmax]
  xRange = [marginLeft, width - marginRight], // [left, right]
  xLabel = label, // a label for the x-axis
  xFormat = format, // a format specifier string for the x-axis
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  yLabel = "↑ Frequency", // a label for the y-axis
  yFormat = normalize ? "%" : undefined, // a format specifier string for the y-axis
  color = "currentColor", // bar fill color
  uservars = [],
  axes = [],
  brushes = [],
  chords = [],
  ribbons = [],
  colors = [],
  contours = [],
  densities = [],
  delaunays = [],
  voronois = [],
  dispatches = [],
  drags = [],
  simulations = [],
  centers = [],
  collides = [],
  nodelinks = [],
  manybodies = [],
  radials = [],
  geopaths = [],
  projections = [],
  circles = [],
  graticules = [],
  streams = [],
  nodes = [],
  stratifies = [],
  clusters = [],
  trees = [],
  treemaps = [],
  partitions = [],
  packs = [],
  paths = [],
  quadtrees = [],
  continuousscales = [],
  powerscales = [],
  logscales = [],
  timescales = [],
  sequentialscales = [],
  divergingscales = [],
  quantizescales = [],
  quantiles = [],
  thresholdsscales = [],
  ordinalscales = [],
  bands = [],
  points = [],
  selections = [],
  arcs = [],
  pies = [],
  lines = [],
  lineRadials = [],
  areas = [],
  areaRadials = [],
  curves = [],
  links = [],
  linkRadials = [],
  symbols = [],
  stacks = [],
  locales = [],
  timeintervals = [],
  timers = [],
  transitions = [],
  zooms = [],
  zoomTransforms = [],
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y0 = d3.map(data, y);
  const I = d3.range(X.length);

    // Vars
  for (let i = 0; i < uservars.length; i++) {
    let uservar = uservars[i];
    switch(uservar.varType) {
      case varTypes.minimum:
        uservar.output = d3.min(data.reduce(uservar.input))
        break;
      // TODO DEFINE ALL VARTYPES BEFORE REMOVING THIS
      case undefined:
        break;
      case varTypes.minimumIndex:
        uservar.output = d3.minIndex(data.reduce(uservar.input))
        break;
      case varTypes.maximum:
        uservar.output = d3.max(data.reduce(uservar.input))
        break;
      case varTypes.maximumIndex:
        uservar.output = d3.maxIndex(data.reduce(uservar.input))
        break;
      case varTypes.extent:
        uservar.output = d3.extent(data.reduce(uservar.input))
        break;
      case varTypes.sum:
        uservar.output = d3.sum(data.reduce(uservar.input))
        break;
      case varTypes.mean:
        uservar.output = d3.mean(data.reduce(uservar.input))
        break;
      case varTypes.median:
        uservar.output = d3.median(data.reduce(uservar.input))
        break;
      case varTypes.medianIndex:
        uservar.output = d3.medianIndex(data.reduce(uservar.input))
        break;
      case varTypes.mode:
        uservar.output = d3.mode(data.reduce(uservar.input))
        break;
      case varTypes.cumulativesum:
        uservar.output = d3.cumsum(data.reduce(uservar.input))
        break;
      case varTypes.rank:
        uservar.output = d3.rank(data.reduce(uservar.input))
        break;
      case varTypes.quantile:
        uservar.output = d3.quantile(data.reduce(uservar.input))
        break;
      case varTypes.quantileIndex:
        uservar.output = d3.quantileIndex(data.reduce(uservar.input))
        break;
      case varTypes.quantileSorted:
        uservar.output = d3.quantileSorted(data.reduce(uservar.input))
        break;
      case varTypes.variance:
        uservar.output = d3.variance(data.reduce(uservar.input))
        break;
      case varTypes.deviation:
        uservar.output = d3.deviation(data.reduce(uservar.input))
        break;
      case varTypes.fCumulativeSum:
        uservar.output = d3.fcumsum(data.reduce(uservar.input))
        break;
      case varTypes.fSum:
        uservar.output = d3.fsum(data.reduce(uservar.input))
        break;
      case varTypes.least:
        uservar.output = d3.least(data.reduce(uservar.input))
        break;
      case varTypes.leastIndex:
        uservar.output = d3.leastIndex(data.reduce(uservar.input))
        break;
      case varTypes.greatest:
        uservar.output = d3.greatest(data.reduce(uservar.input))
        break;
      case varTypes.greatestIndex:
        uservar.output = d3.greatestIndex(data.reduce(uservar.input))
        break;
      case varTypes.bisectCenter:
        uservar.output = d3.bisectCenter(data.reduce(uservar.input))
        break;
      case varTypes.bisectLeft:
        uservar.output = d3.bisectLeft(data.reduce(uservar.input))
        break;
      case varTypes.bisect:
        uservar.output = d3.bisect(data.reduce(uservar.input))
        break;
      case varTypes.bisectRight:
        uservar.output = d3.bisectRight(data.reduce(uservar.input))
        break;
      case varTypes.sortAscending:
        uservar.output = d3.ascending(data.reduce(uservar.input))
        break;
      case varTypes.sortDescending:
        uservar.output = d3.descending(data.reduce(uservar.input))
        break;
      case varTypes.adder:
        if (uservar.adder == undefined){
          uservar.adder = new d3.Adder()
        }
        uservar.adder.add(uservar.input)
        uservar.output = uservar.adder.valueOf()
        break;
      case varTypes.blur:
        uservar.output = d3.blur(data.reduce(uservar.input))
        break;
      case varTypes.blur2:
        uservar.output = d3.blur2(data.reduce(uservar.input))
        break;
      case varTypes.blurImage:
        uservar.output = d3.blurImage(data)
        break;
      case varTypes.quickselect:
        uservar.output = d3.quickselect(data)
        break;
      case varTypes.bisector:
        if (uservar.bisector == undefined){
          uservar.bisector = new d3.bisector(uservar.input)
        }
        break;
      case varTypes.customBisectCenter:
        uservar.output = uservar.bisector.center(data.reduce(uservar.input))
        break;
      case varTypes.customBisectLeft:
        uservar.output = uservar.bisector.left(data.reduce(uservar.input))
        break;
      case varTypes.customBisectRight:
        uservar.output = uservar.bisector.right(data.reduce(uservar.input))
        break;
      case varTypes.flatGroup:
        uservar.output = d3.flatGroup(data.reduce(uservar.input))
        break;
      case varTypes.flatRollup:
        uservar.output = d3.flatRollup(data.reduce(uservar.input))
        break;
      case varTypes.groupSort:
        uservar.output = d3.groupSort(data.reduce(uservar.input))
        break;
      case varTypes.group:
        uservar.output = d3.group(data.reduce(uservar.input))
        break;
      case varTypes.groups:
        uservar.output = d3.groups(data.reduce(uservar.input))
        break;
      case varTypes.index:
        uservar.output = d3.index(data.reduce(uservar.input))
        break;
      case varTypes.indexes:
        uservar.output = d3.indexes(data.reduce(uservar.input))
        break;
      case varTypes.rollup:
        uservar.output = d3.rollup(data.reduce(uservar.input))
        break;
      case varTypes.rollups:
        uservar.output = d3.rollups(data.reduce(uservar.input))
        break;
      case varTypes.count:
        uservar.output = d3.count(data.reduce(uservar.input))
        break;
      case varTypes.cross:
        uservar.output = d3.cross(data.reduce(uservar.input))
        break;
      case varTypes.merge:
        uservar.output = d3.merge(data.reduce(uservar.input))
        break;
      case varTypes.pairs:
        uservar.output = d3.pairs(data.reduce(uservar.input))
        break;
      case varTypes.permute:
        uservar.output = d3.permute(data.reduce(uservar.input))
        break;
      case varTypes.shuffle:
        uservar.output = d3.shuffle(data.reduce(uservar.input))
        break;
      case varTypes.shuffler:
        uservar.output = d3.shuffler(data.reduce(uservar.input))
        break;
      case varTypes.ticks:
        uservar.output = d3.ticks(data.reduce(uservar.input))
        break;
      case varTypes.tickIncrement:
        uservar.output = d3.tickIncrement(data.reduce(uservar.input))
        break;
      case varTypes.tickStep:
        uservar.output = d3.tickStep(data.reduce(uservar.input))
        break;
      case varTypes.nice:
        uservar.output = d3.nice(data.reduce(uservar.input))
        break;
      case varTypes.range:
        uservar.output = d3.range(data.reduce(uservar.input))
        break;
      case varTypes.transpose:
        uservar.output = d3.transpose(data.reduce(uservar.input))
        break;
      case varTypes.zip:
        uservar.output = d3.zip(data.reduce(uservar.input))
        break;
      case varTypes.every:
        uservar.output = d3.every(data.reduce(uservar.input))
        break;
      case varTypes.some:
        uservar.output = d3.some(data.reduce(uservar.input))
        break;
      case varTypes.filter:
        uservar.output = d3.filter(data.reduce(uservar.input))
        break;
      case varTypes.map:
        uservar.output = d3.map(data.reduce(uservar.input))
        break;
      case varTypes.reduce:
        uservar.output = d3.reduce(data.reduce(uservar.input))
        break;
      case varTypes.reverse:
        uservar.output = d3.reverse(data.reduce(uservar.input))
        break;
      case varTypes.sort:
        uservar.output = d3.sort(data.reduce(uservar.input))
        break;
      case varTypes.difference:
        uservar.output = d3.difference(data.reduce(uservar.input))
        break;
      case varTypes.disjoint:
        uservar.output = d3.disjoint(data.reduce(uservar.input))
        break;
      case varTypes.intersection:
        uservar.output = d3.intersection(data.reduce(uservar.input))
        break;
      case varTypes.superset:
        uservar.output = d3.superset(data.reduce(uservar.input))
        break;
      case varTypes.subset:
        uservar.output = d3.subset(data.reduce(uservar.input))
        break;
      case varTypes.union:
        uservar.output = d3.union(data.reduce(uservar.input))
        break;
      case varTypes.bin:
        if (uservar.bin == undefined){
            uservar.bin = d3.bin()
        }
        break;
      case varTypes.getBin:
        uservar.output = uservar.bin
        break;
      case varTypes.binValue:
        uservar.output = uservar.bin.value()
        break;
      case varTypes.binDomain:
        uservar.output = uservar.bin.domain()
        break;
      case varTypes.binThresholds:
        uservar.output = uservar.bin.thresholds()
        break;
      case varTypes.thresholdFreedmanDiaconis:
        uservar.output = d3.thresholdFreedmanDiaconis(data.reduce(uservar.input))
        break;
      case varTypes.thresholdScott:
        uservar.output = d3.thresholdScott(data.reduce(uservar.input))
        break;
      case varTypes.thresholdSturges:
        uservar.output = d3.thresholdSturges(data.reduce(uservar.input))
        break;
      case varTypes.internMap:
        uservar.output = d3.InternMap(data.reduce(uservar.input))
        break;
      case varTypes.internSet:
        uservar.output = d3.InternSet(data.reduce(uservar.input))
        break;
      default:
        uservar.output = uservar.input
        break;
    } 
  }

  // Axes
  for (let i = 0; i < axes.length; i++){
    let axisData = axes[i];
    let axis = new d3.axisTop()
    axis.scale(axisData.scale)
    axis.ticks(axisData.ticks)
    axis.tickArguments(axisData.tickArguments)
    axis.tickValues(axisData.tickValues)
    axis.tickFormat(axisData.tickFormat)
    axis.tickSize(axisData.tickSize)
    axis.tickSizeInner(axisData.tickSizeInner)
    axis.tickSizeOuter(axisData.tickSizeOuter)
    axis.tickPadding(axisData.tickPadding)
    axis.offset(axisData.offset)
    // render the axis
  }

  // Brushes
  for (let i = 0; i < brushes.length; i++){
    let brushData = brushes[i];
    let brush = new d3.brush()
    brush.extent(brushData.extent)
    brush.filter(brushData.filter)
    brush.touchable(brushData.touchable)
    brush.keyModifiers(brushData.keyModifiers)
    brush.handleSize(brushData.handleSize)
    brush.on(brushData.events)
      // brush.move()
  // brush.clear()
  }

  // Chords
  for (let i = 0; i < chords.length; i++){
    let chordData = chords[i];
    let chord = new d3.chord()
    chord.padAngle(chordData.padAngle)
    chord.sortGroups(chordData.sortGroups)
    chord.sortSubgroups(chordData.sortSubGroups)
    chord.sortChords(chordData.sortChords)
  }

  // Ribbons
  for (let i = 0; i < ribbons.length; i++){
    let ribbonData = ribbons[i]
    let ribbon = new d3.ribbon()
    ribbon.source(ribbonData.source)
    ribbon.target(ribbonData.target)
    ribbon.radius(ribbonData.radius)
    ribbon.sourceRadius(ribbonData.sourceRadius)
    ribbon.targetRadius(ribbonData.targetRadius)
    ribbon.startAngle(ribbonData.startAngle)
    ribbon.endAngle(ribbonData.endAngle)
    ribbon.padAngle(ribbonData.padAngle)
    ribbon.context(ribbonData.context)  
  }

  // Colors
  for (let i = 0; i < colors.length; i++){
    let colorData = colors[i]
    let color = new d3.color()
    color.opacity(colorData.opacity)
    color.rgb(colorData.rgb)
    color.copy(colorData.copy)
    color.brighter(colorData.brighter)
    color.darker(colorData.darker)
    color.displayable(colorData.displayable)
    color.formatHex(colorData.formatHex)
    color.formatHex8(colorData.formatHex8)
    color.formatHsl(colorData.formatHsl)
    color.formatRgb(colorData.formatRgb)
    color.toString()
  }

  // Contours
  for (let i = 0; i < contours.length; i++){
    let contourData = contours[i]
    let contour = new d3.contours()
    contour.contour(contourData.contour)
    contour.size(contourData.size)
    contour.smooth(contourData.smooth)
    contour.thresholds(contourData.thresholds)
  }

  // Densities
  for (let i = 0; i < densities.length; i++){
    let densityData = densities[i]
    let density = new d3.contourDensity()
    density.x()
    density.y()
    density.weight()
    density.size()
    density.cellSize()
    density.thresholds()
    density.bandwidth()
    density.contours()
  }

  // Delaunays
  for (let i = 0; i < delaunays.length; i++){
    let delaunayData = delaunays[i]
    let delaunay = new d3.Delaunay()
    delaunay.points()
    delaunay.halfedges()
    delaunay.hull()
    delaunay.triangles()
    delaunay.inedges()
    delaunay.find()
    delaunay.neighbors()
    delaunay.render()
    delaunay.renderHull()
    delaunay.renderTriangle()
    delaunay.renderPoints()
    delaunay.hullPolygon()
    delaunay.trianglePolygons()
    delaunay.trianglePolygon()
    delaunay.update()
    delaunay.voronoi()
  }

  // Voronois
  for (let i = 0; i < voronois.length; i++){
    let voronoiData = voronois[i]
    let voronoi = new d3.Voronoi()
    voronoi.delaunay()
    voronoi.circumcenters()
    voronoi.vectors()
    voronoi.xmin()
    voronoi.ymin()
    voronoi.xmax()
    voronoi.ymax()
    voronoi.contains()
    voronoi.neighbors()
    voronoi.render()
    voronoi.renderBounds()
    voronoi.renderCell()
    voronoi.cellPolygons()
    voronoi.cellPolygon()
    voronoi.update()
  }

  // Dispatches
  for (let i = 0; i < dispatches.length; i++){
    let dispatchData = dispatches[i]
    let dispatch = new d3.dispatch()
    dispatch.on()
    dispatch.copy()
    dispatch.call()
    dispatch.apply()
  }

  // Drags
  for (let i = 0; i < drags.length; i++){
    let dragData = drags[i]
    let drag = new d3.drag()
    drag.container()
    drag.filter()
    drag.touchable()
    drag.subject()
    drag.clickDistance()
    drag.on()
  }

  // Simulations
  for (let i = 0; i < simulations.length; i++){
    let simulationData = simulations[i]
    let simulation = new d3.forceSimulation()
    simulation.restart()
  // simulation.stop()
  // simulation.tick()
  // simulation.nodes()
  // simulation.alpha()
  // simulation.alphaMin()
  // simulation.alphaDecay()
  // simulation.alphaTarget()
  // simulation.velocityDecay()
  // simulation.force()
  // simulation.find()
  // simulation.randomSource()
  // simulation.on()
  }

  // Centers
  for (let i = 0; i < centers.length; i++){
    let centerData = centers[i]
    let center = new d3.forceCenter()
      // center.x()
  // center.y()
  // center.strength()
  }

  // Collides
  for (let i = 0; i < collides.length; i++){
    let collideData = collides[i]
    let collide = new d3.forceCollide()
      // collide.radius()
  // collide.strength()
  // collide.iterations()
  }

  // Node Links
  for (let i = 0; i < nodelinks.length; i++){
    let nodelinkData = nodelinks[i]
    let nodelink = new d3.forceLink()
      // link.links()
  // link.id()
  // link.distance()
  // link.strength()
  // link.iterations()
  }

  // ManyBodies
  for (let i = 0; i < manybodies.length; i++){
    let manybodyData = manybodies[i]
    let manybody = new d3.forceManyBody()
      // manyBody.strength()
  // manyBody.theta()
  // manyBody.distanceMin()
  // manyBody.distanceMax()
  }

  // Radials
  for (let i = 0; i < radials.length; i++){
    let radialData = radials[i]
    let radial = new d3.forceRadial()
      // radial.strength()
  // radial.radius()
  // radial.x()
  // radial.y()
  }

  // GeoPaths
  for (let i = 0; i < geopaths.length; i++){
    let geopathData = geopaths[i]
    let geopath = new d3.geoPath()
  // path.area()
  // path.bounds()
  // path.centroid()
  // path.measure()
  // path.projection()
  // path.context()
  // path.pointRadius()
  }

  // Projections
  for (let i = 0; i < projections.length; i++){
    let projectionData = projections[i]
    let projection = new d3.geoProjection()
  }

  // Circles
  for (let i = 0; i < circles.length; i++){
    let circleData = circles[i]
    let circle = new d3.geoCircle()
    // circle.center()
  // circle.radius()
  // circle.precision()
  }

  // Graticules
  for (let i = 0; i < graticules.length; i++){
    let graticuleData = graticules[i]
    let graticule = new d3.geoGraticule()
      // graticule.lines()
  // graticule.outline()
  // graticule.extent()
  // graticule.extentMajor()
  // graticule.extentMinor()
  // graticule.step()
  // graticule.stepMajor()
  // graticule.stepMinor()
  // graticule.precision()        
  }

  // Streams
  for (let i = 0; i < streams.length; i++){
    let streamData = streams[i]
    let stream = new d3.geoStream()
      // stream.point()
  // stream.lineStart()
  // stream.lineEnd()
  // stream.polygonStart()
  // stream.polygonEnd()
  // stream.sphere()
  }

  // Nodes
  for (let i = 0; i < nodes.length; i++){
    let nodeData = nodes[i]
    let node = new d3.hierarchy()
  }

  // Stratifys
  for (let i = 0; i < stratifies.length; i++){
    let stratifyData = stratifies[i]
    let stratify = new d3.stratify()
      // stratify()
  // stratify.id()
  // stratify.parentId()
  // stratify.path()
  }

  // Clusters
  for (let i = 0; i < clusters.length; i++){
    let clusterData = clusters[i]
    let cluster = new d3.cluster()
      // cluster()
  // cluster.size()
  // cluster.nodeSize()
  // cluster.separation()
  }

  // Trees
  for (let i = 0; i < trees.length; i++){
    let treeData = trees[i]
    let tree = new d3.tree()
      // tree.size()
  // tree.nodeSize()
  // tree.separation()
  }

  // Treemaps
  for (let i = 0; i < treemaps.length; i++){
    let treemapData = treemaps[i]
    let treemap = new d3.treemap()
      // treemap.tile()
  // treemap.size()
  // treemap.round()
  // treemap.padding()
  // treemap.paddingInner()
  // treemap.paddingOuter()
  // treemap.paddingTop()
  // treemap.paddingRight()
  // treemap.paddingBottom()
  // treemap.paddingLeft()
  }

  // Partitions
  for (let i = 0; i < partitions.length; i++){
    let partitionData = partitions[i]
    let partition = new d3.partition()
      // partition.size()
  // partition.round()
  // partition.padding()
  }

  // Packs
  for (let i = 0; i < packs.length; i++){
    let packData = packs[i]
    let pack = new d3.pack()
      // pack.radius()
  // pack.size()
  // pack.padding()
  }

  // Paths
  for (let i = 0; i < paths.length; i++){
    let pathData = paths[i]
    let path = new d3.path()
      // path.moveTo()
  // path.closePath()
  // path.lineTo()
  // path.quadraticCurveTo()
  // path.bezierCurveTo()
  // path.arcTo()
  // path.arc()
  // path.rect()
  // path.toString()
  }

  // Quadtrees
  for (let i = 0; i < quadtrees.length; i++){
    let quadtreeData = quadtrees[i]
    let quadtree = new d3.quadtree()
      // quadtree.x()
  // quadtree.y()
  // quadtree.extent()
  // quadtree.cover()
  // quadtree.add()
  // quadtree.addAll()
  // quadtree.remove()
  // quadtree.removeAll()
  // quadtree.copy()
  // quadtree.root()
  // quadtree.data()
  // quadtree.size()
  // quadtree.find()
  // quadtree.visit()
  // quadtree.visitAfter()
  }

  // ContinousScales
  for (let i = 0; i < continuousscales.length; i++){
    let continousScaleData = continuousscales[i]
    // let continousScale = new d3.continuous()
      // continuous.invert()
  // continuous.domain()
  // continuous.range()
  // continuous.rangeRound()
  // continuous.clamp()
  // continuous.unknown()
  // continuous.interpolate()
  // continuous.ticks()
  // continuous.tickFormat()
  // continuous.nice()
  // continuous.copy()
  }

  // PowerScales
  for (let i = 0; i < powerscales.length; i++){
    let powerScaleData = powerscales[i]
    // let powerScale = new d3.pow()
      // pow.invert()
  // pow.exponent()
  // pow.domain()
  // pow.range()
  // pow.rangeRound()
  // pow.clamp()
  // pow.interpolate()
  // pow.ticks()
  // pow.tickFormat()
  // pow.nice()
  // pow.copy()
  }

  // LogScales
  for (let i = 0; i < logscales.length; i++){
    let logScaleData = logscales[i]
    let logScale = new d3.scaleLog()
      // log.invert()
  // log.base()
  // log.domain()
  // log.range()
  // log.rangeRound()
  // log.clamp()
  // log.interpolate()
  // log.ticks()
  // log.tickFormat()
  // log.nice()
  // log.copy()
  }

  // TimeScales
  for (let i = 0; i < timescales.length; i++){
    let timeScaleData = timescales[i]
    let timeScale = new d3.scaleTime()
      // time.invert()
  // time.domain()
  // time.range()
  // time.rangeRound()
  // time.clamp()
  // time.interpolate()
  // time.ticks()
  // time.tickFormat()
  // time.nice()
  // time.copy()
  }

  // SequentialScales
  for (let i = 0; i < sequentialscales.length; i++){
    let sequentialScaleData = sequentialscales[i]
    let sequentialScale = new d3.scaleSequential()
      // sequential.domain()
  // sequential.clamp()
  // sequential.interpolator()
  // sequential.range()
  // sequential.rangeRound()
  // sequential.copy()
  }

  // DivergingScales
  for (let i = 0; i < divergingscales.length; i++){
    let divergingScaleData = divergingscales[i]
    let divergingScale = new d3.scaleDiverging()
      // diverging.domain()
  // diverging.clamp()
  // diverging.interpolator()
  // diverging.range()
  // diverging.rangeRound()
  // diverging.copy()
  // diverging.unknown()
  }

  // QuantizeScales
  for (let i = 0; i < quantizescales.length; i++){
    let quantizeScaleData = quantizescales[i]
    let quantizeScale = new d3.scaleQuantize()
      // quantize.invertExtent()
  // quantize.domain()
  // quantize.range()
  // quantize.ticks()
  // quantize.tickFormat()
  // quantize.nice()
  // quantize.thresholds()
  // quantize.copy()
  }

  // Quantiles
  for (let i = 0; i < quantiles.length; i++){
    let quantileData = quantiles[i]
    let quantile = new d3.quantile()
      // quantile.invertExtent()
  // quantile.domain()
  // quantile.range()
  // quantile.quantiles()
  // quantile.copy()
  }

  // Thresholds
  for (let i = 0; i < thresholdsscales.length; i++){
    let thresholdData = thresholdsscales[i]
    let threshold = new d3.scaleThreshold()

  // threshold.invertExtent()
  // threshold.domain()
  // threshold.range()
  // threshold.copy()
  }

  // Ordinals
  for (let i = 0; i < ordinalscales.length; i++){
    let ordinalScaleData = ordinalscales[i]
    let ordinalScale = new d3.scaleOrdinal()
      // ordinal.domain()
  // ordinal.range()
  // ordinal.unknown()
  // ordinal.copy()
  }

  // Bands
  for (let i = 0; i < bands.length; i++){
    let bandData = bands[i]
    let band = new d3.scaleBand()
      // band.domain()
  // band.range()
  // band.rangeRound()
  // band.round()
  // band.paddingInner()
  // band.paddingOuter()
  // band.padding()
  // band.align()
  // band.bandwidth()
  // band.step()
  // band.copy()
  }

  // Points
  for (let i = 0; i < points.length; i++){
    let pointData = points[i]
    let point = new d3.scalePoint()

  // point.domain()
  // point.range()
  // point.rangeRound()
  // point.round()
  // point.padding()
  // point.align()
  // point.bandwidth()
  // point.step()
  // point.copy()
  }

  // Selections
  for (let i = 0; i < selections.length; i++){
    let selectionData = selections[i]
    let selection = new d3.selection()
      // selection.select()
  // selection.selectAll()
  // selection.filter()
  // selection.merge()
  // selection.selectChild()
  // selection.selectChildren()
  // selection.selection()
    // selection.attr()
  // selection.classed()
  // selection.style()
  // selection.property()
  // selection.text()
  // selection.html()
  // selection.append()
  // selection.insert()
  // selection.remove()
  // selection.clone()
  // selection.sort()
  // selection.order()
  // selection.raise()
  // selection.lower()

  // selection.data()
  // selection.join()
  // selection.enter()
  // selection.exit()
  // selection.datum()
  // selection.on()
  // selection.dispatch()
    // selection.each()
  // selection.call()
  // selection.empty()
  // selection.nodes()
  // selection.node()
  // selection.size()
  }

  // Arcs
  for (let i = 0; i < arcs.length; i++){
    let arcData = arcs[i]
    let arc = new d3.arc()

  // arc.centroid()
  // arc.innerRadius()
  // arc.outerRadius()
  // arc.cornerRadius()
  // arc.startAngle()
  // arc.endAngle()
  // arc.padAngle()
  // arc.padRadius()
  // arc.context()
  }

  // Pies
  for (let i = 0; i < pies.length; i++){
    let pieData = pies[i]
    let pie = new d3.pie()
      // pie.value()
  // pie.sort()
  // pie.sortValues()
  // pie.startAngle()
  // pie.endAngle()
  // pie.padAngle()
  }

  // Lines
  for (let i = 0; i < lines.length; i++){
    let lineData = lines[i]
    let line = new d3.line()
      // line.x()
  // line.y()
  // line.defined()
  // line.curve()
  // line.context()
  }

  // LineRadials
  for (let i = 0; i < lineRadials.length; i++){
    let lineRadialData = lineRadials[i]
    let lineRadial = new d3.lineRadial()
      // lineRadial.angle()
  // lineRadial.radius()
  // lineRadial.defined()
  // lineRadial.curve()
  // lineRadial.context()
  }

  // Areas
  for (let i = 0; i < areas.length; i++){
    let areaData = areas[i]
    let area = new d3.area()
      // area.x()
  // area.x0()
  // area.x1()
  // area.y()
  // area.y0()
  // area.y1()
  // area.defined()
  // area.curve()
  // area.context()
  // area.lineX0()
  // area.lineY0()
  // area.lineX1()
  // area.lineY1()
  }

  // AreaRadials
  for (let i = 0; i < areaRadials.length; i++){
    let areaRadialData = areaRadials[i]
    let areaRadial = new d3.areaRadial()
      // areaRadial.angle()
  // areaRadial.startAngle()
  // areaRadial.endAngle()
  // areaRadial.radius()
  // areaRadial.innerRadius()
  // areaRadial.outerRadius()
  // areaRadial.defined()
  // areaRadial.curve()
  // areaRadial.context()
  // areaRadial.lineStartAngle()
  // areaRadial.lineInnerRadius()
  // areaRadial.lineEndAngle()
  // areaRadial.lineOuterRadius()
  }

  // Curves
  for (let i = 0; i < curves.length; i++){
    let curveData = curves[i]
    // let curve = new d3.curve()
      // curve.areaStart()
  // curve.areaEnd()
  // curve.lineStart()
  // curve.lineEnd()
  // curve.point()
  }

  // Links
  for (let i = 0; i < links.length; i++){
    let linkData = links[i]
    let link = new d3.link()
  }

  // LinkRadials
  for (let i = 0; i < linkRadials.length; i++){
    let linkRadialData = linkRadials[i]
    let linkRadial = new d3.linkRadial()
      // linkRadial.angle()
  // linkRadial.radius()
  }

  // Symbols
  for (let i = 0; i < symbols.length; i++){
    let symbolData = symbols[i]
    let symbol = new d3.symbol()
      // symbol.type()
  // symbol.size()
  // symbol.context()
  }

  // Stacks
  for (let i = 0; i < stacks.length; i++){
    let stackData = stacks[i]
    let stack = new d3.stack()
      // stack.keys()
  // stack.value()
  // stack.order()
  // stack.offset()
  }

  // Locales
  for (let i = 0; i < locales.length; i++){
    let localeData = locales[i]
    // let locale = new d3.locale()
      // locale.format()
  // locale.parse()
  // locale.utcFormat()
  // locale.utcParse()
  }

  // TimeIntervals
  for (let i = 0; i < timeintervals.length; i++){
    let timeIntervalData = timeintervals[i]
    let timeInterval = new d3.timeInterval()

  // interval.floor()
  // interval.round()
  // interval.ceil()
  // interval.offset()
  // interval.range()
  // interval.filter()
  // interval.every()
  // interval.count()
  }

  // Timers
  for (let i = 0; i < timers.length; i++){
    let timerData = timers[i]
    let timer = new d3.timer()
      // timer.restart()
  // timer.stop()
  }

  // Transitions
  for (let i = 0; i < transitions.length; i++){
    let transitionData = transitions[i]
    let transition = new d3.transition()
        // transition.select()
  // transition.selectAll()
  // transition.selectChild()
  // transition.selectChildren()
  // transition.selection()
  // transition.filter()
  // transition.merge()
  // transition.transition()
  // transition.attr()
  // transition.attrTween()
  // transition.style()
  // transition.styleTween()
  // transition.text()
  // transition.textTween()
  // transition.remove()
  // transition.tween()
  // transition.delay()
  // transition.duration()
  // transition.ease()
  // transition.easeVarying()
  // transition.end()
  // transition.on()
  // transition.each()
  // transition.call()
  // transition.empty()
  // transition.nodes()
  // transition.node()
  // transition.size()
  }

  // Zooms
  for (let i = 0; i < zooms.length; i++){
    let zoomData = zooms[i]
    let zoom = new d3.zoom()

  // zoom.transform()
  // zoom.translateBy()
  // zoom.translateTo()
  // zoom.scaleBy()
  // zoom.scaleTo()
  // zoom.constrain()
  // zoom.filter()
  // zoom.touchable()
  // zoom.wheelDelta()
  // zoom.extent()
  // zoom.scaleExtent()
  // zoom.translateExtent()
  // zoom.clickDistance()
  // zoom.tapDistance()
  // zoom.duration()
  // zoom.interpolate()
  // zoom.on()

  }

  // ZoomTransforms
  for (let i = 0; i < zoomTransforms.length; i++){
    let zoomTransformData = zoomTransforms[i]
    let zoomTransform = new d3.zoomTransform()
    // transform.scale()
  // transform.translate()
  // transform.apply()
  // transform.applyX()
  // transform.applyY()
  // transform.invert()
  // transform.invertX()
  // transform.invertY()
  // transform.rescaleX()
  // transform.rescaleY()
  // transform.toString()
  }

  // d3.axisTop()
  // d3.axisRight()
  // d3.axisBottom()
  // d3.axisLeft()
  // axis()
  // d3.brush()
  // d3.brushX()
  // d3.brushY()
  // brush
  // d3.brushSelection()
  // d3.chord()
  // chord()
  // d3.chordDirected()
  // d3.chordTranspose()
  // d3.ribbon()
  // ribbon()
  // d3.ribbonArrow()
  // ribbonArrow.headRadius()
  // d3.color()
  // d3.rgb()
  // rgb.clamp()
  // d3.hsl()
  // hsl.clamp()
  // d3.lab()
  // d3.gray()
  // d3.hcl()
  // d3.lch()
  // d3.cubehelix()
  // d3.schemeCategory10()
  // d3.schemeAccent()
  // d3.schemeDark2()
  // d3.schemePaired()
  // d3.schemePastel1()
  // d3.schemePastel2()
  // d3.schemeSet1()
  // d3.schemeSet2()
  // d3.schemeSet3()
  // d3.schemeTableau10()  
  // d3.interpolateBrBG()
  // d3.interpolatePiYG()
  // d3.interpolatePRGn()
  // d3.interpolatePuOr()
  // d3.interpolateRdBu()
  // d3.interpolateRdGy()
  // d3.interpolateRdYlBu()
  // d3.interpolateRdYlGn()
  // d3.interpolateSpectral()
  // d3.schemeBrBG()
  // d3.schemePiYG()
  // d3.schemePRGn()
  // d3.schemePuOr()
  // d3.schemeRdBu()
  // d3.schemeRdGy()
  // d3.schemeRdYlBu()
  // d3.schemeRdYlGn()
  // d3.schemeSpectral()
  // d3.interpolateBlues()
  // d3.interpolateGreens()
  // d3.interpolateGreys()
  // d3.interpolateOranges()
  // d3.interpolatePurples()
  // d3.interpolateReds()
  // d3.schemeBlues()
  // d3.schemeGreens()
  // d3.schemeGreys()
  // d3.schemeOranges()
  // d3.schemePurples()
  // d3.schemeReds()
  // d3.interpolateBuGn()
  // d3.interpolateBuPu()
  // d3.interpolateCividis()
  // d3.interpolateCool()
  // d3.interpolateCubehelixDefault()
  // d3.interpolateGnBu()
  // d3.interpolateInferno()
  // d3.interpolateMagma()
  // d3.interpolateOrRd()
  // d3.interpolatePlasma()
  // d3.interpolatePuBu()
  // d3.interpolatePuBuGn()
  // d3.interpolatePuRd()
  // d3.interpolateRdPu()
  // d3.interpolateTurbo()
  // d3.interpolateViridis()
  // d3.interpolateWarm()
  // d3.interpolateYlGn()
  // d3.interpolateYlGnBu()
  // d3.interpolateYlOrBr()
  // d3.interpolateYlOrRd() 
  // d3.schemeBuGn()
  // d3.schemeBuPu()
  // d3.schemeGnBu()
  // d3.schemeOrRd()
  // d3.schemePuBu()
  // d3.schemePuBuGn()
  // d3.schemePuRd()
  // d3.schemeRdPu()
  // d3.schemeYlGn()
  // d3.schemeYlGnBu()
  // d3.schemeYlOrBr()
  // d3.schemeYlOrRd()
  // d3.interpolateRainbow()
  // d3.interpolateSinebow()
  // d3.contours()
  // contours
  // d3.contourDensity()
  // new Delaunay
  // Delaunay.from()
  // d3.dispatch()
  // d3.drag()
  // drag()
  // d3.dragDisable()
  // d3.dragEnable()
  // event.on()
  // d3.csvParse()
  // d3.csvParseRows()
  // d3.csvFormat()
  // d3.csvFormatBody()
  // d3.csvFormatRows()
  // d3.csvFormatRow()
  // d3.csvFormatValue()
  // d3.tsvParse()
  // d3.tsvParseRows()
  // d3.tsvFormat()
  // d3.tsvFormatBody()
  // d3.tsvFormatRows()
  // d3.tsvFormatRow()
  // d3.tsvFormatValue()
  // d3.dsvFormat()
  // dsv.parse()
  // dsv.parseRows()
  // dsv.format()
  // dsv.formatBody()
  // dsv.formatRows()
  // dsv.formatRow()
  // dsv.formatValue()
  // d3.autoType()
  // ease()
  // d3.easeLinear()
  // d3.easePolyIn()
  // d3.easePolyOut()
  // d3.easePoly()
  // d3.easePolyInOut()
  // poly.exponent()
  // d3.easeQuadIn()
  // d3.easeQuadOut()
  // d3.easeQuad()
  // d3.easeQuadInOut()
  // d3.easeCubicIn()
  // d3.easeCubicOut()
  // d3.easeCubic()
  // d3.easeCubicInOut()
  // d3.easeSinIn()
  // d3.easeSinOut()
  // d3.easeSin()
  // d3.easeSinInOut()
  // d3.easeExpIn()
  // d3.easeExpOut()
  // d3.easeExp()
  // d3.easeExpInOut()
  // d3.easeCircleIn()
  // d3.easeCircleOut()
  // d3.easeCircle()
  // d3.easeCircleInOut()
  // d3.easeElasticIn()
  // d3.easeElastic()
  // d3.easeElasticOut()
  // d3.easeElasticInOut()
  // elastic.amplitude()
  // elastic.period()
  // d3.easeBackIn()
  // d3.easeBackOut()
  // d3.easeBack()
  // d3.easeBackInOut()
  // back.overshoot()
  // d3.easeBounceIn()
  // d3.easeBounce()
  // d3.easeBounceOut()
  // d3.easeBounceInOut()
  // d3.blob()
  // d3.buffer()
  // d3.csv()
  // d3.dsv()
  // d3.html()
  // d3.image()
  // d3.json()
  // d3.svg()
  // d3.text()
  // d3.tsv()
  // d3.xml()
  // d3.forceSimulation()
  // force()
  // force.initialize()
  // d3.forceCenter()
  // d3.forceCollide()
  // d3.forceLink()
  // d3.forceManyBody()
  // d3.forceX()
  // x.strength()
  // x.x()
  // d3.forceY()
  // y.strength()
  // y.y()
  // d3.forceRadial()
  // d3.format()
  // d3.formatPrefix()
  // locale.format()
  // locale.formatPrefix()
  // d3.formatSpecifier()
  // new d3.FormatSpecifier()
  // d3.precisionFixed()
  // d3.precisionPrefix()
  // d3.precisionRound()
  // d3.formatLocale()
  // d3.formatDefaultLocale()
  // d3.geoPath()
  // path()
  // projection()
  // projection.invert()
  // projection.stream()
  // projection.preclip()
  // projection.postclip()
  // projection.clipAngle()
  // projection.clipExtent()
  // projection.scale()
  // projection.translate()
  // projection.center()
  // projection.angle()
  // projection.reflectX()
  // projection.reflectY()
  // projection.rotate()
  // projection.precision()
  // projection.fitExtent()
  // projection.fitSize()
  // projection.fitWidth()
  // projection.fitHeight()
  // d3.geoAzimuthalEqualArea()
  // d3.geoAzimuthalEqualAreaRaw()
  // d3.geoAzimuthalEquidistant()
  // d3.geoAzimuthalEquidistantRaw()
  // d3.geoGnomonic()
  // d3.geoGnomonicRaw()
  // d3.geoOrthographic()
  // d3.geoOrthographicRaw()
  // d3.geoStereographic()
  // d3.geoStereographicRaw()
  // d3.geoEqualEarth()
  // d3.geoEqualEarthRaw()
  // d3.geoAlbersUsa()
  // conic.parallels()
  // d3.geoAlbers()
  // d3.geoConicConformal()
  // d3.geoConicConformalRaw()
  // d3.geoConicEqualArea()
  // d3.geoConicEqualAreaRaw()
  // d3.geoConicEquidistant()
  // d3.geoConicEquidistantRaw()
  // d3.geoEquirectangular()
  // d3.geoEquirectangularRaw()
  // d3.geoMercator()
  // d3.geoMercatorRaw()
  // d3.geoTransverseMercator()
  // d3.geoTransverseMercatorRaw()
  // d3.geoNaturalEarth1()
  // d3.geoNaturalEarth1Raw()
  // project()
  // project.invert()
  // d3.geoProjection()
  // d3.geoProjectionMutator()
  // d3.geoArea()
  // d3.geoBounds()
  // d3.geoCentroid()
  // d3.geoDistance()
  // d3.geoLength()
  // d3.geoInterpolate()
  // d3.geoContains()
  // d3.geoRotation()
  // rotation()
  // rotation.invert()
  // d3.geoCircle()
  // circle()
  // d3.geoGraticule()
  // graticule()
  // d3.geoGraticule10()
  // d3.geoStream()
  // d3.geoTransform()
  // d3.geoIdentity()
  // preclip()
  // postclip()
  // d3.geoClipAntimeridian()
  // d3.geoClipCircle()
  // d3.geoClipRectangle()
  // d3.hierarchy()
  // node.ancestors()
  // node.descendants()
  // node.leaves()
  // node.find()
  // node.path()
  // node.links()
  // node.sum()
  // node.count()
  // node.sort()
  // node[Symbol.iterator]()
  // node.each()
  // node.eachAfter()
  // node.eachBefore()
  // node.copy()
  // d3.stratify()
  // d3.cluster()
  // d3.tree()
  // tree()
  // d3.treemap()
  // treemap()
  // d3.treemapBinary()
  // d3.treemapDice()
  // d3.treemapSlice()
  // d3.treemapSliceDice()
  // d3.treemapSquarify()
  // d3.treemapResquarify()
  // squarify.ratio()
  // d3.partition()
  // partition()
  // d3.pack()
  // pack()
  // d3.packSiblings()
  // d3.packEnclose()
  // d3.interpolate()
  // d3.interpolateNumber()
  // d3.interpolateRound()
  // d3.interpolateString()
  // d3.interpolateDate()
  // d3.interpolateArray()
  // d3.interpolateNumberArray()
  // d3.interpolateObject()
  // d3.interpolateTransformCss()
  // d3.interpolateTransformSvg()
  // d3.interpolateZoom()
  // interpolateZoom.rho()
  // d3.interpolateDiscrete()
  // d3.quantize()
  // d3.interpolateRgb()
  // d3.interpolateRgbBasis()
  // d3.interpolateRgbBasisClosed()
  // d3.interpolateHsl()
  // d3.interpolateHslLong()
  // d3.interpolateLab()
  // d3.interpolateHcl()
  // d3.interpolateHclLong()
  // d3.interpolateCubehelix()
  // d3.interpolateCubehelixLong()
  // interpolate.gamma()
  // d3.interpolateHue()
  // d3.interpolateBasis()
  // d3.interpolateBasisClosed()
  // d3.piecewise()
  // d3.path()
  // d3.polygonArea()
  // d3.polygonCentroid()
  // d3.polygonHull()
  // d3.polygonContains()
  // d3.polygonLength()
  // d3.quadtree()
  // d3.randomUniform()
  // d3.randomInt()
  // d3.randomNormal()
  // d3.randomLogNormal()
  // d3.randomBates()
  // d3.randomIrwinHall()
  // d3.randomExponential()
  // d3.randomPareto()
  // d3.randomBernoulli()
  // d3.randomGeometric()
  // d3.randomBinomial()
  // d3.randomGamma()
  // d3.randomBeta()
  // d3.randomWeibull()
  // d3.randomCauchy()
  // d3.randomLogistic()
  // d3.randomPoisson()
  // random.source()
  // d3.randomLcg()
  // continuous()
  // d3.tickFormat()
  // d3.scaleLinear()
  // d3.scalePow()
  // pow()
  // d3.scaleSqrt()
  // d3.scaleLog()
  // log()
  // d3.scaleSymlog()
  // symlog.constant()
  // d3.scaleIdentity()
  // d3.scaleRadial()
  // d3.scaleTime()
  // time()
  // d3.scaleUtc()
  // d3.scaleSequential()
  // sequential()
  // d3.scaleSequentialLog()
  // d3.scaleSequentialPow()
  // d3.scaleSequentialSqrt()
  // d3.scaleSequentialSymlog()
  // d3.scaleSequentialQuantile()
  // sequentialQuantile.quantiles()
  // d3.scaleDiverging()
  // diverging()
  // d3.scaleDivergingLog()
  // d3.scaleDivergingPow()
  // d3.scaleDivergingSqrt()
  // d3.scaleDivergingSymlog()
  // d3.scaleQuantize()
  // quantize()
  // d3.scaleQuantile()
  // quantile()
  // d3.scaleThreshold()
  // threshold()
  // d3.scaleOrdinal()
  // ordinal()
  // d3.scaleImplicit()
  // d3.scaleBand()
  // band()
  // d3.scalePoint()
  // point()
  // d3.selection()
  // d3.select()
  // d3.selectAll()
  // d3.matcher()
  // d3.selector()
  // d3.selectorAll()
  // d3.window()
  // d3.style()
  // d3.create()
  // d3.creator()
  // d3.pointer()
  // d3.pointers()
  // selection[Symbol.iterator]
  // d3.local()
  // local.set()
  // local.get()
  // local.remove()
  // local.toString()
  // d3.namespace()
  // d3.namespaces()
  // d3.arc()
  // arc()
  // d3.pie()
  // pie()
  // d3.line()
  // line()
  // d3.lineRadial()
  // lineRadial()
  // d3.area()
  // area()
  // d3.areaRadial()
  // areaRadial()
  // d3.curveBasis()
  // d3.curveBasisClosed()
  // d3.curveBasisOpen()
  // d3.curveBundle()
  // bundle.beta()
  // d3.curveBumpX()
  // d3.curveBumpY()
  // d3.curveCardinal()
  // d3.curveCardinalClosed()
  // d3.curveCardinalOpen()
  // cardinal.tension()
  // d3.curveCatmullRom()
  // d3.curveCatmullRomClosed()
  // d3.curveCatmullRomOpen()
  // catmullRom.alpha()
  // d3.curveLinear()
  // d3.curveLinearClosed()
  // d3.curveMonotoneX()
  // d3.curveMonotoneY()
  // d3.curveNatural()
  // d3.curveStep()
  // d3.curveStepAfter()
  // d3.curveStepBefore()
  // d3.link()
  // d3.linkVertical()
  // d3.linkHorizontal()
  // link()
  // link.source()
  // link.target()
  // link.x()
  // link.y()
  // link.context()
  // d3.linkRadial()
  // d3.symbol()
  // symbol()
  // d3.symbolsFill()
  // d3.symbolsStroke()
  // d3.symbolAsterisk()
  // d3.symbolCircle()
  // d3.symbolCross()
  // d3.symbolDiamond()
  // d3.symbolDiamond2()
  // d3.symbolPlus()
  // d3.symbolSquare()
  // d3.symbolSquare2()
  // d3.symbolStar()
  // d3.symbolTriangle()
  // d3.symbolTriangle2()
  // d3.symbolWye()
  // d3.symbolX()
  // d3.pointRadial()
  // symbolType.draw()
  // d3.stack()
  // stack()
  // d3.stackOrderAppearance()
  // d3.stackOrderAscending()
  // d3.stackOrderDescending()
  // d3.stackOrderInsideOut()
  // d3.stackOrderNone()
  // d3.stackOrderReverse()
  // d3.stackOffsetExpand()
  // d3.stackOffsetDiverging()
  // d3.stackOffsetNone()
  // d3.stackOffsetSilhouette()
  // d3.stackOffsetWiggle()
  // d3.timeFormat()
  // d3.timeParse()
  // d3.utcFormat()
  // d3.utcParse()
  // d3.isoFormat()
  // d3.isoParse()
  // d3.timeFormatLocale()
  // d3.timeFormatDefaultLocale()
  // d3.timeInterval()
  // interval()
  // d3.timeMillisecond()
  // d3.utcMillisecond()
  // d3.timeMilliseconds()
  // d3.utcMilliseconds()
  // d3.timeSecond()
  // d3.utcSecond()
  // d3.timeSeconds()
  // d3.utcSeconds()
  // d3.timeMinute()
  // d3.utcMinute()
  // d3.timeMinutes()
  // d3.utcMinutes()
  // d3.timeHour()
  // d3.utcHour()
  // d3.timeHours()
  // d3.utcHours()
  // d3.timeDay()
  // d3.utcDay()
  // d3.timeDays()
  // d3.utcDays()
  // d3.timeWeek()
  // d3.utcWeek()
  // d3.timeWeeks()
  // d3.utcWeeks()
  // d3.timeSunday()
  // d3.utcSunday()
  // d3.timeSundays()
  // d3.utcSundays()
  // d3.timeMonday()
  // d3.utcMonday()
  // d3.timeMondays()
  // d3.utcMondays()
  // d3.timeTuesday()
  // d3.utcTuesday()
  // d3.timeTuesdays()
  // d3.utcTuesdays()
  // d3.timeWednesday()
  // d3.utcWednesday()
  // d3.timeWednesdays()
  // d3.utcWednesdays()
  // d3.timeThursday()
  // d3.utcThursday()
  // d3.timeThursdays()
  // d3.utcThursdays()
  // d3.timeFriday()
  // d3.utcFriday()
  // d3.timeFridays()
  // d3.utcFridays()
  // d3.timeSaturday()
  // d3.utcSaturday()
  // d3.timeSaturdays()
  // d3.utcSaturdays()
  // d3.timeMonth()
  // d3.utcMonth()
  // d3.timeMonths()
  // d3.utcMonths()
  // d3.timeYear()
  // d3.utcYear()
  // d3.timeYears()
  // d3.utcYears()
  // d3.timeTicks()
  // d3.utcTicks()
  // d3.timeTickInterval()
  // d3.utcTickInterval()
  // d3.now()
  // d3.timer()
  // d3.timerFlush()
  // d3.timeout()
  // d3.interval()
  // selection.transition()
  // selection.interrupt()
  // d3.interrupt()
  // d3.transition()
  // d3.active()
  // d3.zoom()
  // zoom()
  // d3.zoomTransform.()
  // d3.zoomIdentity()

  // Compute bins.
  const bins = d3.bin().thresholds(thresholds).value(i => X[i])(I);
  const Y = Array.from(bins, I => d3.sum(I, i => Y0[i]));
  if (normalize) {
    const total = d3.sum(Y);
    for (let i = 0; i < Y.length; ++i) Y[i] /= total;
  }

  // Compute default domains.
  if (xDomain === undefined) xDomain = [bins[0].x0, bins[bins.length - 1].x1];
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];

  // Construct scales and axes.
  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80, xFormat).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);
  yFormat = yScale.tickFormat(100, yFormat);
  
  const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  const everything = svg.selectAll("*");
  everything.remove();

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("g")
      .attr("fill", color)
    .selectAll("rect")
    .data(bins)
    .join("rect")
      .attr("x", d => xScale(d.x0) + insetLeft)
      .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - insetLeft - insetRight))
      .attr("y", (d, i) => yScale(Y[i]))
      .attr("height", (d, i) => yScale(0) - yScale(Y[i]))
    .append("title")
      .text((d, i) => [`${d.x0} ≤ x < ${d.x1}`, yFormat(Y[i])].join("\n"));

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis)
      .call(g => g.append("text")
          .attr("x", width - marginRight)
          .attr("y", 27)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xLabel));

  return svg.node();
}

let unemployment = [{id: 1, state: "NY", county: "D", rate: 5.1}, 
{id: 2, state: "DE", county: "O", rate: 3.2},
{id: 2, state: "AL", county: "W", rate: 3.3},
{id: 2, state: "AK", county: "J", rate: 3.5},
{id: 2, state: "VT", county: "G", rate: 3.5},
{id: 2, state: "FL", county: "C", rate: 3.5},
{id: 2, state: "CA", county: "A", rate: 4.0},
{id: 2, state: "NY", county: "M", rate: 3.2}]

/* let chart = Histogram(unemployment, {
  value: d => d.rate,
  label: "Unemployment rate (%) →",
  width: 500,
  height: 500,
  color: "red"
}) */

  useEffect(() => {
    // D3 Code

    // Dimensions
    let dimensions = {
      width: 1000,
      height: 500,
      margins: 50,
    };

    dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
    dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

    // SELECTIONS
    /* const svg = d3
      .select(svgRef.current)
      .classed("line-chart", true)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);

    const everything = svg.selectAll("*");
    everything.remove();

    const container = svg
      .append("g")
      .classed("container", true)
      .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);

    // Draw Circle
    container.append("circle").attr("r", 25); */
    ChartSet(props.data, {
    value: d => d.rate,
    label: "Rate (%) →",
    width: 500,
    height: 500,
    color: props.color,
    uservars: props.vars
  })
  }, [props.data, props.color]); // redraw chart if data changes

  return <svg ref={svgRef} />;
};

export default Chart;