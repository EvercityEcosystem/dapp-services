<template>
  <div>
    <p>
      {{ $t("offsettingcommon.agent") }}:
      <RChainExplorer :address="sender" />
    </p>
    <p>
      {{ $t("offsettingcommon.objective") }}:
      <RIpfsExplorer :hash="objective" />
    </p>
    <p>
      {{ $t("offsettingcommon.token") }}:
      <RChainExplorer :address="token" category="token" />
    </p>
  </div>
</template>

<script>
export default {
  props: ["sender", "objective", "token"]
};
</script>
