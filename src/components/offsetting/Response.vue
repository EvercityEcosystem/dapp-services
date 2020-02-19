<template>
  <div>
    <p>
      {{$t('offsettingcommon.agent')}}:
      <RLinkExplorer :text="sender" />
    </p>
    <p>
      {{$t('offsettingcommon.objective')}}:
      <RLinkExplorer :text="objective" type="ipfs" />
    </p>
    <p>
      {{$t('offsettingcommon.token')}}:
      <RLinkExplorer :text="token" category="token" />
    </p>
  </div>
</template>

<script>
export default {
  props: ["sender", "objective", "token"]
};
</script>
