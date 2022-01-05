<script language="ts">
// @ts-ignore
import { computed, defineComponent, reactive, ref } from 'vue'
// @ts-ignore
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  name: 'GMap',
  components: {
    GoogleMap,
    Marker
  },
  setup() {
    const center = { lat: 43.65107, lng: -79.347015 }
    const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }
    const processMarker = () => {
      alert('timing....')
    }
    const themes = ['aubergine', 'dark', 'grey', 'minimal', 'retro', 'roadways', 'roadwaysMinimal', 'ultraLight']
    const theme = ref('')
    return {
      center,
      themes,
      theme,
      markerOptions,
      processMarker
    }
  }
})
</script>

<template>
  <div class="map-box">
    <label for="theme">Theme</label>
    <select v-model="theme" id="theme">
      <option value="">-- None --</option>
      <option v-for="theme in themes" :value="theme" :key="theme">{{ theme }}</option>
    </select>
    <GoogleMap :styles="theme" api-key="your key" style="width: 100%; height: 500px" :center="center" :zoom="15">
      <Marker @click="processMarker" :options="markerOptions" />
    </GoogleMap>
    <Marker :options="{ position: center }" />
  </div>
</template>

<style scoped>
.map-box {
  width: 450px;
  margin: 0 auto;
}
</style>
