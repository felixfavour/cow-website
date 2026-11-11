<template>
  <!-- Scrolls horizontally on narrow screens without putting display:block
       on the table itself, which breaks column-width sizing in Safari and
       clips cell text instead of wrapping or scrolling it. -->
  <div class="doc-table-wrapper">
    <table><slot /></table>
  </div>
</template>
