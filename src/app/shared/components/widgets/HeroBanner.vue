<template>
	<section class="mb-8 py-20 text-white text-center relative">
		<div class="absolute inset-0 w-full h-full bg-cover introduction-bg bg-[url('/img/header.png')]"/>
		<div class="container mx-auto">
			<div class="text-white main-header-content">
				<h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}!</h1>
				<p class="w-full md:w-8/12 mx-auto">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
					et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
					suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
					pulvinar, fringilla lorem eget, ullamcorper urna.
				</p>
			</div>
		</div>

		<img alt="emojis" class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
			 src="/img/introduction-music.png"/>
	</section>
</template>

<script setup lang="ts">

</script>
