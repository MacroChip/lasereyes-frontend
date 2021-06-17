
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

window.app = app;
window.firebase && window.firebase.analytics();
// var firebaseConfig = {
// 	apiKey: "AIzaSyBM_05ysmvXdTiX9LdYhlkj4PTx2mFW8OA",
// 	authDomain: "auto-laser.firebaseapp.com",
// 	projectId: "auto-laser",
// 	storageBucket: "auto-laser.appspot.com",
// 	messagingSenderId: "940020933136",
// 	appId: "1:940020933136:web:9d6e3b09509c430dae6095",
// 	measurementId: "G-TPN1C8PYJJ"
//   };

export default app;