<!-- Homepage intro: two brushed-steel lift doors (colour tokens only) cover the hero on load and
     slide open; scrolling down slides them shut again (scroll-driven, where supported).
     Hidden for prefers-reduced-motion. Scroll timeline: --hero (set on PageHero). -->
<div class="door door-left" aria-hidden="true"></div>
<div class="door door-right" aria-hidden="true"></div>

<style>
	.door {
		display: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		.door {
			display: block;
			position: absolute;
			top: 0;
			bottom: 0;
			z-index: 3;
			width: 50%;
			pointer-events: none;
			background:
				repeating-linear-gradient(90deg, rgb(255 255 255 / 0.06) 0 1px, transparent 1px 4px),
				linear-gradient(
					90deg,
					var(--color-steel-light),
					var(--color-line) 30%,
					var(--color-surface) 55%,
					var(--color-line) 80%,
					var(--color-steel-light)
				);
		}

		/* Load: slide open (transform). Scroll: slide shut again as the hero leaves (translate). */
		.door-left {
			left: 0;
			box-shadow: inset -2px 0 0 rgb(11 31 58 / 0.4);
			animation: lift-door-open-left 1.4s 0.35s cubic-bezier(0.65, 0, 0.35, 1) both;
		}

		.door-right {
			right: 0;
			box-shadow: inset 2px 0 0 rgb(11 31 58 / 0.4);
			animation: lift-door-open-right 1.4s 0.35s cubic-bezier(0.65, 0, 0.35, 1) both;
		}

		@supports (animation-timeline: view()) {
			.door-left {
				animation:
					lift-door-open-left 1.4s 0.35s cubic-bezier(0.65, 0, 0.35, 1) both,
					lift-door-close-left linear both;
				animation-timeline: auto, --hero;
				animation-range: normal, exit 0% exit 75%;
			}

			.door-right {
				animation:
					lift-door-open-right 1.4s 0.35s cubic-bezier(0.65, 0, 0.35, 1) both,
					lift-door-close-right linear both;
				animation-timeline: auto, --hero;
				animation-range: normal, exit 0% exit 75%;
			}
		}

		@keyframes -global-lift-door-open-left {
			to {
				transform: translateX(-100%);
			}
		}

		@keyframes -global-lift-door-open-right {
			to {
				transform: translateX(100%);
			}
		}

		/* Uses `translate` so it adds to the load animation's `transform` */
		@keyframes -global-lift-door-close-left {
			from {
				translate: 0;
			}
			to {
				translate: 100%;
			}
		}

		@keyframes -global-lift-door-close-right {
			from {
				translate: 0;
			}
			to {
				translate: -100%;
			}
		}
	}
</style>
