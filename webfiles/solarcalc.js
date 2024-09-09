async function initCesium() {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwN2I0NzFmZi1hMDU1LTQ4ZDctYWIyMS02YWRjOTQ5ZDIwMjYiLCJpZCI6MjM5OTc1LCJpYXQiOjE3MjU4MjAxNDF9.XXdQKamHri1xAcNolRpA-7PYZm0BVuhDAIKsbjaiJY0';

    // Initialize Cesium Viewer
    const viewer = new Cesium.Viewer("cesiumContainer", {
        terrainProvider: Cesium.createWorldTerrain(),
    });

    try {
        // A normal b3dm tileset containing photogrammetry (from Cesium Ion)
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(40866);
        viewer.scene.primitives.add(tileset);
        await viewer.zoomTo(tileset);

        // A b3dm tileset used to classify the photogrammetry tileset (local file)
        const classificationTilesetUrl = "../SampleData/Cesium3DTiles/Classification/Photogrammetry/tileset.json";
        const classificationTileset = await Cesium.Cesium3DTileset.fromUrl(
            classificationTilesetUrl,
            {
                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
            }
        );
        classificationTileset.style = new Cesium.Cesium3DTileStyle({
            color: "rgba(255, 0, 0, 0.5)",
        });
        viewer.scene.primitives.add(classificationTileset);

        // The same b3dm tileset used for classification, but rendered normally for comparison
        const nonClassificationTileset = await Cesium.Cesium3DTileset.fromUrl(
            classificationTilesetUrl,
            {
                show: false, // Initially hidden
            }
        );
        nonClassificationTileset.style = new Cesium.Cesium3DTileStyle({
            color: "rgba(255, 0, 0, 0.5)",
        });
        viewer.scene.primitives.add(nonClassificationTileset);

        // Add event listener to toggle between classified and non-classified tileset
        document.getElementById("toggleClassification").addEventListener("click", function() {
            const isClassificationVisible = classificationTileset.show;
            classificationTileset.show = !isClassificationVisible;
            nonClassificationTileset.show = isClassificationVisible;
        });

        // Remove the loading overlay once all tilesets are loaded
        tileset.tileLoadProgressEvent.addEventListener(() => {
            if (tileset.ready && classificationTileset.ready && nonClassificationTileset.ready) {
                document.getElementById("loadingOverlay").style.display = "none";
            }
        });
        

    } catch (error) {
        console.error(`Error loading tileset: ${error}`);
    }
}

// Initialize the scene
initCesium();


/* button workings */

// Select the necessary elements
const decrementButton = document.querySelector('.dec');
const incrementButton = document.querySelector('.inc');
const numberInput = document.querySelector('.number-input');


// Event listener for the decrement button
decrementButton.addEventListener('click', () => {
    let currentValue = parseInt(numberInput.value);
    if (currentValue > 0) {
        numberInput.value = currentValue - 1;
    }
});

// Event listener for the increment button
incrementButton.addEventListener('click', () => {
    let currentValue = parseInt(numberInput.value);
    numberInput.value = currentValue + 1;
});

const eval = document.getElementById('.eval');
eval= numberInput.value;

