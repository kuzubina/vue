<template>
	<div class="loader-wrapper border-radius">
      <div class="preloader-wrapper big active">
          <div class="spinner-layer spinner-green-only">
              <div class="circle-clipper left">
                  <div class="circle"></div>
              </div>
              <div class="gap-patch">
                  <div class="circle"></div>
              </div>
              <div class="circle-clipper right">
                  <div class="circle"></div>
              </div>
          </div>
      </div>
  </div>
</template>

<style>
    .loader-wrapper  {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff; 
        z-index: 2;
    }
</style>