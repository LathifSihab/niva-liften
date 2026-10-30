// Free-licence example photos for the demo (Wikimedia Commons). None of them shows Nivå's own
// work or people: the Photo component labels each one "Voorbeeldfoto" and credits it.
// Replace with real Nivå photos for production.
import controllerCabinetsWide from '../assets/photos/controller-cabinets-1920.jpg';
import controllerCabinets from '../assets/photos/controller-cabinets.jpg';
import liftDoorsWide from '../assets/photos/lift-doors-1920.jpg';
import liftDoors from '../assets/photos/lift-doors.jpg';
import liftInstallationWide from '../assets/photos/lift-installation-1920.jpg';
import liftInstallation from '../assets/photos/lift-installation.jpg';
import liftMachineWide from '../assets/photos/lift-machine-1920.jpg';
import liftMachine from '../assets/photos/lift-machine.jpg';
import modernisedLiftsWide from '../assets/photos/modernised-lifts-1920.jpg';
import modernisedLifts from '../assets/photos/modernised-lifts.jpg';
import liftMotorRoomWide from '../assets/photos/lift-motor-room-1920.jpg';
import liftMotorRoom from '../assets/photos/lift-motor-room.jpg';
import projectEetvilla from '../assets/photos/project-eetvilla.jpg';
import projectGravenhof from '../assets/photos/project-gravenhof.jpg';
import projectHuisartsenpraktijk from '../assets/photos/project-huisartsenpraktijk.jpg';
import projectMeander from '../assets/photos/project-meander.jpg';
import projectStadlander from '../assets/photos/project-stadlander.jpg';
import projectStudentHotel from '../assets/photos/project-student-hotel.jpg';

export type Photo = {
	src: string;
	/** 1920px version for full-bleed use */
	wide?: string;
	width: number;
	height: number;
	alt: string;
	credit: { author: string; license: string; licenseUrl: string; source: string };
};

const ccBySa4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' };
const ccBySa3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' };
const ccBy2 = { license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' };
const ccBy4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' };
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const photos = {
	liftDoors: {
		src: liftDoors,
		wide: liftDoorsWide,
		width: 960,
		height: 709,
		alt: 'Roestvrijstalen liftdeuren in een marmeren omlijsting',
		credit: { author: 'AndyB', ...ccBySa3, source: commons('Mutual_Building_Cape_Town_032.jpg') }
	},
	modernisedLifts: {
		src: modernisedLifts,
		wide: modernisedLiftsWide,
		width: 960,
		height: 720,
		alt: 'Twee liften in een stationshal na modernisering',
		credit: {
			author: 'Baron Maddock',
			...ccBy4,
			source: commons('The_Clark_Street_subway_station_elevators_post_modernization.jpg')
		}
	},
	liftInstallation: {
		src: liftInstallation,
		wide: liftInstallationWide,
		width: 960,
		height: 720,
		alt: 'Nieuwe lift in aanbouw, gezien van boven in de schacht',
		credit: {
			author: 'MTA Capital Construction',
			...ccBy2,
			source: commons('West_cavern_elevator_installation._(CM007,_03-21-2019)_(33565520878).jpg')
		}
	},
	liftMachine: {
		src: liftMachine,
		wide: liftMachineWide,
		width: 960,
		height: 1280,
		alt: 'Liftmachine met aandrijving in een machinekamer',
		credit: {
			author: 'Danielrichardbond',
			...ccBySa4,
			source: commons('Trellick_Tower_Lift_Motor_Room_02.JPG')
		}
	},
	controllerCabinets: {
		src: controllerCabinets,
		wide: controllerCabinetsWide,
		width: 960,
		height: 720,
		alt: 'Besturingskasten in een liftmachinekamer',
		credit: {
			author: 'Danielrichardbond',
			...ccBySa4,
			source: commons('Trellick_Tower_Lift_Motor_Room_03.JPG')
		}
	},
	liftMotorRoom: {
		src: liftMotorRoom,
		wide: liftMotorRoomWide,
		width: 960,
		height: 720,
		alt: 'Liftmachines naast elkaar in een machinekamer',
		credit: {
			author: 'Kgbo',
			...ccBySa4,
			source: commons('Lift_motor_room_of_40_Tank_Street,_Brisbane.jpg')
		}
	},
	projectGravenhof: {
		src: projectGravenhof,
		width: 960,
		height: 638,
		alt: 'Appartementencomplex van baksteen met balkons',
		credit: {
			author: 'Vroegje',
			...ccBySa4,
			source: commons('Nieuwbouw_De_Schutspatroon_-_Amersfoort.jpg')
		}
	},
	projectStudentHotel: {
		src: projectStudentHotel,
		width: 960,
		height: 1280,
		alt: 'Hoge woontoren met oranje gevel',
		credit: {
			author: 'Michielverbeek',
			...ccBySa4,
			source: commons('Arnhem-Stadseiland,_flat_Abe_Lenstrahof_foto6_2015-07-01_16.50.jpg')
		}
	},
	projectStadlander: {
		src: projectStadlander,
		width: 960,
		height: 638,
		alt: 'Nieuwe appartementen aan het water',
		credit: {
			author: 'Vroegje',
			...ccBySa4,
			source: commons('Nieuwbouw_aan_de_Eem_in_Amersfoort.jpg')
		}
	},
	projectMeander: {
		src: projectMeander,
		width: 960,
		height: 960,
		alt: 'Galerijflat van tien verdiepingen',
		credit: {
			author: 'Sergé Technau',
			...ccBySa4,
			source: commons(
				'Overzicht_galerijflat_van_tien_verdiepingen_in_de_Bijlmermeer_-_Amsterdam_-_20409441_-_RCE.jpg'
			)
		}
	},
	projectEetvilla: {
		src: projectEetvilla,
		width: 960,
		height: 981,
		alt: 'Bakstenen villa met torentjes, zwart-witfoto',
		credit: {
			author: 'J.P. de Koning',
			...ccBySa4,
			source: commons(
				'Overzicht_voorgevel_en_rechter_zijgevel,_fabrikantenvilla_met_koetshuis_-_Helmond_-_20348309_-_RCE.jpg'
			)
		}
	},
	projectHuisartsenpraktijk: {
		src: projectHuisartsenpraktijk,
		width: 960,
		height: 641,
		alt: 'Gezondheidscentrum in een modern bakstenen gebouw',
		credit: {
			author: 'G.Lanting',
			...ccBy4,
			source: commons('Gezondheidscentrum_Bredero_P1480917.jpg')
		}
	}
} satisfies Record<string, Photo>;
