<template>
  <div style="position: absolute;top: 20px;right: 20px;">
    <span v-if="status == statuses.OK" class="label label-green t-sm">Connected</span>
    <span v-else-if="status == statuses.WARNING" class="label label-orange t-sm">Connected</span>
    <span v-else class="label label-orange t-sm">Disconnected</span>

    <!-- <a
      class="js-tooltip m-l-10"
      href="javascript:;"
      data-tooltip="'The CPSs behavioral model, or program, which takes into account the technical and economic parameters of its communication' - from Robonomics White Paper, 4 Liability of the machine"
    >
      <i class="i-info"></i>
    </a>-->
  </div>
</template>

<script>
import { getStatusPeers } from "../utils/tools";

const lookPeers = [
  "QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8",
  "QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9",
  "QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw"
];

export default {
  data() {
    return {
      required: [],
      other: [],
      status: "",
      statuses: {
        OK: 1,
        WARNING: 2,
        ERROR: 3
      }
    };
  },
  mounted() {
    this.getPeers();
    // new Tooltip(
    // 		  	e,
    // 		  	{
    //           // title: parser.parseFromString(e.getAttribute('data-tooltip'), "text/xml"),
    // 			    title: e.getAttribute('data-tooltip'),
    // 			    placement: 'auto',
    //           container: 'body'
    // 		  	});
  },
  methods: {
    async getPeers() {
      try {
        const peers = await getStatusPeers(
          this.$ipfs,
          this.$robonomics,
          lookPeers
        );
        this.required = peers.required;
        this.other = peers.other;

        const count = peers.required.length;
        if (count > 1) {
          this.status = this.statuses.OK;
        } else if (count === 1) {
          this.status = this.statuses.WARNING;
        } else {
          this.status = this.statuses.ERROR;
        }
      } catch (error) {
        this.status = this.statuses.ERROR;
      }

      setTimeout(() => {
        this.getPeers();
      }, 5000);
    }
  }
};
</script>
