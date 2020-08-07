<template>
  <div class="tuto-container">
    <div class="tutos">
      <v-row>
        <v-col class="step">
          <p>STEP 1</p>
          <p class="text">Click on the items to select them.</p>

          <div class="item center">
            <img src="@/assets/set3update/items/01.png" alt="item" />
          </div>
          <div class="item center">
            <img src="@/assets/set3update/items/02.png" alt="item" />
          </div>
          <div class="item center">
            <img src="@/assets/set3update/items/03.png" alt="item" />
          </div>
        </v-col>
        <v-col class="step">
          <p>STEP 2</p>
          <p class="text">Get best carrys for your items !</p>
          <p class="text">Click to add them to your comp.</p>
        </v-col>
        <v-col class="step">
          <p>STEP 3</p>
          <p class="text">When you sell a champ you get the item back to use it on another carry !</p>
        </v-col>
      </v-row>
      <v-btn color="primary">Let's go !</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "tuto",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.tuto-container {
  position: relative;
}

.tutos {
  position: absolute;
  text-align: center;
  height: 100%;
  width: 80%;
  left: 50%;
  transform: translate(-50%, 0);
}

.text {
  font-size: 25px !important;
}

.step {
  text-align: center;
}

$cyan: #60daaa;
$blue: #5c80bc;

.item {
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;

  // To avoid blue selection of HTML items
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background: none;
  border: 0;
  box-sizing: border-box;
  margin: 0.1em;
  padding: 0.1em;

  // Using inset box-shadow instead of border for sizing simplicity
  box-shadow: inset 0 0 0 2px $blue;

  // Required, since we're setting absolute on pseudo-elements
  position: relative;
  vertical-align: middle;

  &::before,
  &::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
  }

  img {
    height: 75px;
    background: black;
  }
}

// Does not inherit
.center {
  &:hover {
    color: $cyan;
  }

  // Set up base styles, we're going to scale instead of animating width/height
  &::before,
  &::after {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transform-origin: center; // Ensure scaling is done from the center (expands outwards)
  }

  // scale3d(<scale-horizontal>, <scale-vertical>, <scale-depth>);
  &::before {
    border-top: 2px solid $cyan;
    border-bottom: 2px solid $cyan;
    transform: scale3d(0, 1, 1); // Shrink only width
  }

  &::after {
    border-left: 2px solid $cyan;
    border-right: 2px solid $cyan;
    transform: scale3d(1, 0, 1); // Shrink only height
  }

  &:hover::before,
  &:hover::after {
    transform: scale3d(1, 1, 1); // Show full-size
    transition: transform 0.5s;
  }
}
</style>
