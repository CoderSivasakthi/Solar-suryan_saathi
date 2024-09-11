// function myMap() {
//     var mapProp= {
//       center:new google.maps.LatLng(51.508742,-0.120850),
//       zoom:5,
//     };
//     var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//     }

const viewer = new Cesium.Viewer("cesiumContainer", {
  baseLayer: false,
  baseLayerPicker: false,
  infoBox: false,
});

const layers = viewer.imageryLayers;

// Add Bing Maps Aerial with Labels to the left panel
const bingMapsAerialWithLabels = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.IonImageryProvider.fromAssetId(3)
);
bingMapsAerialWithLabels.splitDirection = Cesium.SplitDirection.LEFT;
layers.add(bingMapsAerialWithLabels);

// Add Bing Maps Aerial (unlabeled) to the right panel
const bingMapsAerial = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.IonImageryProvider.fromAssetId(2)
);
bingMapsAerial.splitDirection = Cesium.SplitDirection.RIGHT;
layers.add(bingMapsAerial);

// Add high resolution Washington DC imagery to both panels.
const imageryLayer = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.IonImageryProvider.fromAssetId(3827)
);
viewer.imageryLayers.add(imageryLayer);

// Add Bing Maps Labels Only to the right panel
const bingMapsLabelsOnly = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.IonImageryProvider.fromAssetId(2411391)
);
bingMapsLabelsOnly.splitDirection = Cesium.SplitDirection.RIGHT;
layers.add(bingMapsLabelsOnly);

// Zoom to the Washington DC imagery
viewer.zoomTo(imageryLayer);

Sandcastle.addToggleButton(
  "Show Bing Maps Labels Only",
  true,
  (checked) => {
    bingMapsLabelsOnly.show = checked;
  }
);

const slider = document.getElementById("slider");
viewer.scene.splitPosition =
  slider.offsetLeft / slider.parentElement.offsetWidth;

const handler = new Cesium.ScreenSpaceEventHandler(slider);

let moveActive = false;

function move(movement) {
  if (!moveActive) {
    return;
  }

  const relativeOffset = movement.endPosition.x;
  const splitPosition =
    (slider.offsetLeft + relativeOffset) /
    slider.parentElement.offsetWidth;
  slider.style.left = `${100.0 * splitPosition}%`;
  viewer.scene.splitPosition = splitPosition;
}

handler.setInputAction(function () {
  moveActive = true;
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
handler.setInputAction(function () {
  moveActive = true;
}, Cesium.ScreenSpaceEventType.PINCH_START);

handler.setInputAction(move, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
handler.setInputAction(move, Cesium.ScreenSpaceEventType.PINCH_MOVE);

handler.setInputAction(function () {
  moveActive = false;
}, Cesium.ScreenSpaceEventType.LEFT_UP);
handler.setInputAction(function () {
  moveActive = false;
}, Cesium.ScreenSpaceEventType.PINCH_END);



