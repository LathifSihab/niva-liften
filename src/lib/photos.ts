// Free-licence photos for the demo (generic slots only, never shown as Nivå's own team or
// projects). Replace with real Nivå photos for production. Credits are rendered with each photo.
import controllerCabinets from '../assets/photos/controller-cabinets.jpg';
import liftMachine from '../assets/photos/lift-machine.jpg';

export type Photo = {
	src: string;
	width: number;
	height: number;
	alt: string;
	credit: { author: string; license: string; licenseUrl: string; source: string };
};

const ccBySa4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' };

export const photos = {
	liftMachine: {
		src: liftMachine,
		width: 960,
		height: 1280,
		alt: 'Liftmachine met aandrijving in een machinekamer',
		credit: {
			author: 'Danielrichardbond',
			...ccBySa4,
			source: 'https://commons.wikimedia.org/wiki/File:Trellick_Tower_Lift_Motor_Room_02.JPG'
		}
	},
	controllerCabinets: {
		src: controllerCabinets,
		width: 960,
		height: 720,
		alt: 'Besturingskasten in een liftmachinekamer',
		credit: {
			author: 'Danielrichardbond',
			...ccBySa4,
			source: 'https://commons.wikimedia.org/wiki/File:Trellick_Tower_Lift_Motor_Room_03.JPG'
		}
	}
} satisfies Record<string, Photo>;
