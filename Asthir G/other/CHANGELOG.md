# dp.kinect2 Changelog

Download dp.kinect2 from <https://hidale.com/shop/dp-kinect2/>

## v1.2.20210521

* Update to newest compiler and related optimizations
* Update third-party libraries
* Update registration and licensing library
* Minor updates to helpfile example

## v1.2.20200629

The majority of functional changes are related to coordinate transforms
<https://github.com/diablodale/dp.kinect2/issues/56>

### Feature Changes

* `pixeltoskel` will always return 3 floats. dp.kinect2 v1.1 and earlier returned
  longs if depthmap `@type long`
* New `depthtoskel` replaces the ambiguously named `pixeltoskel`. I recommend
  using `depthtoskel` for clarity. They function the same. Both are supported.
* New transforms `depthtocolor`, `skeltocolor`, `skeltodepth`. Use them similar to
  `depthtoskel`. The behavior of these transforms is affected by the values of
  `@distmeter, @flipx, @align, @position, @quat, @rotate, @rotatexyz, and @scale`.
* All transforms `depthtoskel`, `depthtocolor`, `skeltocolor`, `skeltodepth` now
  accept multiple coordinates and return multiple results. For example, you can
  send the two coordinates (110, 85, 2.4) and (200, 350, 1.5) like this:
  ```
  depthtoskel 110 85 2.4 200 350 1.5                <-- sent to inlet
  depthtoskel -0.42012 0.294084 2.4 -0.1 -1.2 1.5   <-- received from outlet
  ```
* New attribute `@skeldepth` that enables output of
  `skeldepth userid jointname x y depth confidence` messages
* New attribute `@skelcolor` that enables output of
  `skelcolor userid jointname x y confidence` messages
* New default filtering of colormap when downscaling with `@align 1` to remove
  double images along edges of objects. Double images are due to the depth and
  color cameras not being in the exact same location. Therefore, edges of seen
  objects are not identically seen by both cameras and often pixels are
  obstructed. This obstruction sometimes causes double images when not filtered
  by this new feature or `@depthonlyplayers`. The new attribute
  `@depthvis` defaults to a reasonable value of 50mm to identify obstructed
  pixels and removes them in common situations. Set `@depthvis 0` to restore
  the old behavior.

### Performance Optimizations

* Time to output depthmap+colormap+joints reduced by milliseconds;
  e.g. 4.6 ms -> 2.6ms on commodity hardware
* Several MB of memory no longer used

### Fixes and minor changes

* Serial number of the currently registered license is shown in the Max
  console when dp.kinect2 is first loaded. <https://github.com/diablodale/dp.kinect2/issues/42>
* Fix occasional issues moving licenses <https://github.com/diablodale/dp.kinect2/issues/45>
* Better handle rare Amazon AWS catastrophic failures like occurred on 28 Feb 2017
* Fix rare silent hang on exit of Max due to WMI deadlock
* Fix orientation of leaf skeleton joints (head, thumb, handtip, foot)

## v1.1

* Provided in a Max package for easy install and better integration into Max
* A help file which provides example patches for typical usage, tips,
  documentation, and links to download optional features.
* Changes to improve frame rates and lag time while reducing CPU usage. Testing on
  a quad-core laptop in a Max patch that displayed the depth and color data resulted
  in total CPU usage of only 5-7%.
* Additional color pixel formats (7 total) to integrate more easily into OpenGL.
  See `@colormap` and `@colortype`.
* High-performance and accurate color conversions using your modern CPU's
  multiprocessing capabilities.
* Alignment of all data -> HD color. This will create HD 1920x1080 upscaled depth,
  infrared, playermap, and pointcloud data which are all aligned to HD color data.
  Use this to create colored pointclouds, HD depth renderings, identifying objects
  in both infrared and visual light spectrum, etc. See `@align`.
* Pointcloud output can be a 3 (xyz) or 4 (xyzw) plane matrix. See `@pointcloud`.
* jit.anim.node support. This allows dp.kinect2 data to be controlled and transformed
  by any jit.anim.node hierarchy. You could use this to reposition all Kinect data in
  real-world coordinates, manually adjust the Kinect's data due to mounting on a
  wall or floor, or coordinate data from multiple sensors into a single coordinate
  space. See `@anim` or connect a jit.anim.node to the inlet of dp.kinect2.
* Transformation attributes for all dp.kinect2 data like
  `@position, @scale, @quat,@rotatexyz, and @rotate`
* You can now combine gravity rotation `@rotatemethod 2` with transformation attributes and
  jit.anim.node support.
* Reduced jitter for face tracking, hand tracking, and joints.
* Face models can now be output as matrices. See `@face3dmodel`.
* New joint orientations (total 4) and a bug fix.
* Pointcloud can now be flipped on the X axis.
* Filtering any combination of all Kinect data, in all pixels formats, by visible
  bodies (aka playerid) is now possible using `@depthonlyplayers`.
* `pixeltoskel` message now uses all align, position, scale, and rotation choices.
* Added support to output face bounding box and 2D face points in depth coordinate
  space (previously was only in color coordinate space). See face's
  `boundsdepth` and `points2ddepth` messages.
* Better support for collections, packages, and executables.
