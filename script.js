class Controller extends Phaser.Scene {
	constructor() {
		super("Controller");
		this.activeScene;
		this.active;
	}
	preload() {
	}
}

class MenuScene extends Phaser.Scene {
	constructor() {
		super("menu");
	}

	preload() {
		this.load.image("bg", "assets/images/menu/AS8-14-2383HR.jpg");
		this.load.image("albedo-preview", "assets/images/menu/albedo-preview.bmp");
		this.load.image("albedoPreview", "assets/images/menu/albedoPreview.png");
		this.load.image("energyBalancePreview", "assets/images/energyBalance/energyBalance.png");
		this.load.image("radiationPreview", "assets/images/menu/radiationPreview.png");
		this.load.image("greenhousePreview", "assets/images/menu/greenhousePreview.png");
		this.load.image("carbonPreview", "assets/images/menu/carbonPreview.png");
		this.load.image("feedbackPreview", "assets/images/menu/feedbackPreview.png");
		this.load.image("effectsPreview", "assets/images/menu/effectsPreview.png");
		
	}

	create() {
		this.add.image(400, 300, "bg").setScale(0.35);

		this.add.text(400, 50, "Earth's Energy Balance", {fontSize: "40px"}).setOrigin(0.5, 1);

		

		this.createButton("energyBalance", 30, 100, "energyBalancePreview", "Earth's\nEnergy\nBalance");
		this.createButton("radiation", 180, 100, "radiationPreview", "Radiation");
		this.createButton("albedo", 330, 100, "albedoPreview", "Albedo");
		this.createButton("greenhouse", 480, 100, "greenhousePreview", "Greenhouse\nEffect");
		this.createButton("carbon", 630, 100, "carbonPreview", "Carbon\nEmissions");
		this.createButton("feedbackLoop", 30, 220, "feedbackPreview", "Feedback Loop");
		this.createButton("effects", 180, 220, "effectsPreview", "Effects");
		


	}

	createButton(scene, x, y, image, text) {
		let btn = this.add.image(x, y, image).setOrigin(0);
		btn.displayWidth = 100;
		btn.displayHeight = 70;

		let txt = this.add.text(x, btn.displayHeight + y, text);
		// txt.setInteractive();
		
		// txt.on("pointerdown", function() {
		//     console.log("CLicked");
		// });

		btn.setInteractive();

		btn.on("pointerdown", onClick.bind(this));

		function onClick() {
			console.log("Clicked");
			this.scene.start(scene);
			//this.scene.setVisible(false);
		}

		

		//custom attribute
		//btn.sceneToActivate = scene;
	}
}
	
class BaseScene extends Phaser.Scene {
	constructor(config) {
		super(config);

		this.nextButton;
		this.backButton;

	}

	preload() {
		this.load.image("arrowButtonActive", "assets/images/arrow.png");
	}

	createNavButtons() {
		let index = this.scene.getIndex(this.scene.key);
		let camera = this.cameras.main;

		if (index < this.scene.manager.scenes.length-1) {
			this.nextButton = this.add.image(camera.displayWidth - 30, camera.centerY, "arrowButtonActive").setOrigin(0, 0.5);
			this.nextButton.angle = 90;
			this.nextButton.scale = 0.2;
			this.nextButton.setInteractive();
			this.nextButton.on("pointerdown", nextScene.bind(this));
			this.input.keyboard.on("keydown-RIGHT", nextScene.bind(this));
		}
		if (index > 1) {
			this.backButton = this.add.image(camera.x + 30, camera.centerY, "arrowButtonActive").setOrigin(0, 0.5);
			this.backButton.angle = -90;
			this.backButton.scale = 0.2;
			this.backButton.setInteractive();
			this.backButton.on("pointerdown", prevScene.bind(this));
			this.input.keyboard.on("keydown-LEFT", prevScene.bind(this));
		}

		let rect = this.add.rectangle(15, 15, 95, 20, 0x444444).setOrigin(0, 0);
		let text = this.add.text(15, 15, "Main Menu", {});

		rect.setInteractive().on("pointerdown", (function() {this.scene.start("menu")}).bind(this))
			.on("pointerover", function() {console.log("pointer"); rect.setFillStyle(0x555555)})
			.on("pointerout", function() {console.log("pointer"); rect.setFillStyle(0x333333)});

		/* let menuButton = this.add.container(25, 25, [rect, text]).setSize(rect.width, rect.height).setInteractive()
			.on("pointerdown", (function() {this.scene.start("menu")}).bind(this))
			.on("pointerover", function() {console.log("pointer"); menuButton.getAt(0).setFillStyle(0x555555)})
			.on("pointerout", function() {console.log("pointer"); menuButton.getAt(0).setFillStyle(0x333333)}); */
		

		function nextScene() {
			console.log("Next");

			let index = this.scene.getIndex(this.scene.key);
			
			if (index < this.scene.manager.scenes.length-1) {
				this.scene.start(this.scene.manager.scenes[index + 1].scene.key);
			}
		}

		function prevScene() {
			console.log("Prev");

			let index = this.scene.getIndex(this.scene.key);

			if (index > 0) {
				this.scene.start(this.scene.manager.scenes[index - 1].scene.key);
			}
		}


	}

	addTitle(title, config) {
		this.add.text(400, 10, title, config || {fontSize: "20px"}).setOrigin(0.5, 0);
	}


}

class EnergyBalanceScene extends BaseScene {
	constructor() {
		super("energyBalance");
	}
	preload() {
		super.preload();
		
		this.load.image("stars", "assets/images/stars.jpg");
		this.load.image("energyBalance", "assets/images/energyBalance/energyBalance.png");
	}
	create() {
		this.add.image(400, 300, "stars");
		this.add.image(400, 300, "energyBalance");

		this.add.text(400, 10, "Earth's Energy Balance", {fontSize: "25px"}).setOrigin(0.5, 0);
		this.add.text(400, 260, "Energy In", {fill: "black", fontSize: "20px"}).setOrigin(0.5, 0);
		this.add.text(85, 100, "Energy Out");
		this.add.text(85, 400, "Energy Out");
		
		super.createNavButtons();

		this.add.text(200, 450,
			"Earth's temperature and climate depend on its energy balance. Energy from the sun is entering and leaving Earth through radiation. If the energy entering is greater than the energy leaving, Earth's temperature will increase. Likewise, if the energy leaving is greater than the energy entering, Earth's temperature will decrease. When they are equal, Earth's temperatuere stays constant.",
			{wordWrap: {width: 500}}
		).setLineSpacing(3);

		
	}
}

class RadiationScene extends BaseScene {
	constructor() {
		super("radiation");
	}

	preload() {
		super.preload();

		this.load.image("sun", "assets/images/radiation/sun.png");
		this.load.image("earth", "assets/images/radiation/earth.png");
		this.load.image("photon", "assets/images/photon.png");
		this.load.image("stars", "assets/images/stars.jpg");
	}

	create() {
		this.add.image(400, 300, "stars");

		let startPoint = new Phaser.Math.Vector2(800, 80);
		let controlPoint1 = new Phaser.Math.Vector2(603, 310);
		let endPoint = new Phaser.Math.Vector2(800, 540);

		this.add.image(750, 300, "sun");
		this.add.image(300, 300, "earth").scale = 1;

		let curve = new Phaser.Curves.QuadraticBezier(startPoint, controlPoint1, endPoint);

		let particles = this.add.particles("photon");
		particles.createEmitter({
			scale: 0.01,
			speedX: -60,
			lifespan: 20000,

			emitZone: {
				source: curve,
				type: "random",
				quantity: 50
			},
			//x: 700,
			//y: 350,
			deathZone: {
				//The earth
				source: new Phaser.Geom.Ellipse(300, 300, 265, 265),
				type: "onEnter"
			},
		});

		this.add.rectangle(0, 450, 800, 130, "black", 0.5).setOrigin(0);
		this.add.text(400, 10, "Radiation", {fontSize: "20px"}).setOrigin(0.5, 0);
		this.add.text(300, 450, "Earth's incoming energy comes from the Sun in the form of solar radiation. The Sun's rays reach Earth in essentially parallel lines. At different latitudes, the angle of the Sun's rays are different, so Earth receives different amounts of solar radiation per unit area. The equator is hit by the Sun's rays perpendicularly, receiving the most radiation. The poles are hit by the Sun's rays parallelly, receiving the least radiation. Different sunlight angles are the reason for the distinct climate at various latitudes.", 
		{
			wordWrap: {
				width: 750
			}
		}
		).setOrigin(0.5, 0);


		super.createNavButtons();

	}
}

class AlbedoScene extends BaseScene {
	
	/**
	 * Add an albedo demonstration: A ground with photons to be aborbed/reflected
	 * @param   {Number}    x   X location of demonstration
	 * 
	 * 
	 */

	//emitterConfig will clear the following fields: x, y, deathZone, frequency, bounce
	addAlbedoDemonstration(x, y, ground, albedo, title, text, emitterConfig, totalRate) {
		let image = this.add.image(x, y, ground);
		let bounds = image.getBounds();

		let photons = this.add.particles("photon");

		//wrap albedo
		if (albedo < 0)      albedo = 0;
		else if (albedo > 1) albedo = 1;

		//Photons to be absorbed

		emitterConfig.x = {min: bounds.x, max: bounds.x + 25};
		emitterConfig.y = {min: bounds.y - 70, max: bounds.y - 35};

		//For the photons to be aborbed, add death zone
		emitterConfig.deathZone =  {
			source: bounds,
			type: "onEnter"
		};
		emitterConfig.frequency = 1/(totalRate*(1-albedo));
		let absorbEmitter = photons.createEmitter(emitterConfig);


		//Photons to be reflected


		emitterConfig.deathZone = {
			//new Phaser.Geom.Rectangle(bounds.x, -10, bounds.width, bounds.height);
			source: new Phaser.Geom.Rectangle(bounds.x, bounds.y - 75, bounds.width, bounds.y),
			type: "onLeave"
		};
		emitterConfig.bounce = 1;
		emitterConfig.bounds = {
			x: bounds.x,
			y: -20,
			w: bounds.width,
			h: bounds.y+10
		};
		emitterConfig.frequency = 1/(totalRate*albedo);
		let reflectEmitter = photons.createEmitter(emitterConfig);

		//this.add.text(title, bounds.x, bounds.y + bounds.height);
		this.add.text(bounds.x + bounds.width/2, bounds.y + bounds.height + 10, title).setOrigin(0.5, 0);
		//this.add.text(text, bounds.x + bounds.width, bounds.y + bounds.height + 10);
	}

	constructor() {
		super({key: "albedo"});
	}
	preload() {
		super.preload();
		//this.load.image("earth", "assets/");
		this.load.image("asphalt", "assets/images/albedo/asphalt-200x105.jpg");
		this.load.image("grass", "assets/images/albedo/grass-200x105.jpg");
		this.load.image("snow", "assets/images/albedo/snow-200x105.jpg");
		this.load.image("seaice", "assets/images/albedo/sea-ice-200x105.jpg");

		this.load.image("photon", "assets/images/photon.png");
	}
	create() {
		this.addAlbedoDemonstration(
			430, 200, "asphalt", 0.12,
			"Asphalt (5-20%)",
			"",
			{
				speedX: 80,
				speedY: 80,
				scale: 0.02,
				lifespan: 8000,
				frequency: 190
			},
			0.2
		);

		this.addAlbedoDemonstration(
			680, 200, "grass", 0.21,
			"Grass (16-21%)",
			"",
			{
				speedX: 80,
				speedY: 80,
				scale: 0.02,
				lifespan: 8000,
				frequency: 190
			},
			0.2
		);

		
		this.addAlbedoDemonstration(
			430, 450, "seaice", 0.4,
			"Sea Ice (30-45%)",
			"",
			{
				speedX: 80,
				speedY: 80,
				scale: 0.02,
				lifespan: 8000,
				frequency: 190
			},
			0.2
		);

		this.addAlbedoDemonstration(
			680, 450, "snow", 0.95,
			"Fresh Snow (95%)",
			"",
			{
				speedX: 80,
				speedY: 80,
				scale: 0.02,
				lifespan: 8000,
				frequency: 190
			},
			0.2
		);


		this.add.text(400, 10, "Albedo", {fontSize: "20px"});

		this.add.text(60, 50, [
			"Albedo is the percentage of light that is reflected by a surface. The higher the albedo, the more reflective a surface is. Different surfaces have different albedos, with dark surfaces tending to have higher albedos than light ones.",
			"Cities have more asphalt and dark surfaces, with higher albedos, than the natural land around them, which have lower albedo surfaces such as forests and grasslands. This is the reason why cities tend to be warmer than the natural land around them."
		],
		{
			wordWrap: {width: 260, useAdvancedWrap: true}
		}
		);

		super.createNavButtons();

		/* let asphalt = this.add.image(400, 400, "asphalt");
		asphalt.scale = 0.4;
		let asphaltBounds = asphalt.getBounds();

		let asphaltParticles = this.add.particles("photon");
		let asphaltAbsorbEmitter = asphaltParticles.createEmitter({
			x: {min: asphaltBounds.x, max: asphaltBounds.x + asphaltBounds.width},
			y: 200,
			speedX: 0,
			speedY: 80,
			scale: 0.02,
			lifespan: 8000,
			frequency: 80,
			deathZone: {
				type: "onEnter",
				source: asphaltBounds
			}
		}); */

		
		//this.add.image()
	}
}

class GreenhouseScene extends BaseScene {
	addPhoton() {
		let point = this.sunBounds.getRandomPoint();
		let photon = this.matter.add.image(point.x, point.y, "photon", null); 
		photon.setCircle();
		photon.setFriction(0, 0, 0);

		photon.setCollisionGroup(this.PHOTON_GROUP);
		photon.setCollisionCategory(this.PHOTON_CAT);
		photon.setBounce(1);
		

		photon.setScale(0.02);
		photon.setVelocity(2, 3);

		photon.sunPhoton = true;

		this.photons.push(photon);
		return photon;
	}

	constructor() {
		super({
			key: "greenhouse",
			physics: {
				matter: {
					debug: false,
				}
			}
		});
		this.photons = [];
	}

	preload() {
		super.preload();

		this.load.image("stars", "assets/images/stars.jpg");
		this.load.image("greenhouseEarth", "assets/images/greenhouse/earth.png");
		this.load.image("greenhouseSun", "assets/images/greenhouse/sun.png");
		this.load.image("atmosphere", "assets/images/greenhouse/atmosphere.png");
		this.load.image("photon", "assets/images/photon.png");
	}

	create() {
		this.PHOTON_GROUP = -1;
		this.ATMOSPHERE_GROUP = -2;
		this.PHOTON_CAT = this.matter.world.nextCategory();
		this.ATMOSPHERE_CAT = this.matter.world.nextCategory();
		this.EARTH_CAT = this.matter.world.nextCategory();
		
		this.photons = [];


		this.add.image(400, 300, "stars");

		//this.add.image(400, 560, "atmosphere").scale = 1.2;
		let atmosphere = this.add.image(400, 540, "atmosphere").setScale(1.1);

		//let earth = this.add.image(410, 760, "earth");
		let earth = this.matter.add.image(400, 760, "greenhouseEarth", null, {
			isStatic: true,
			angle: 140 * Math.PI / 180,
			friction: 0,
			restitution: 1,
			collisionFilter: {
				category: this.EARTH_CAT,
				mask: this.PHOTON_CAT
			},
			circleRadius: 360
		});
		earth.scale = 0.9;
		earth.setBody({
			type: "circle",
			x: 400, 
			y: 760,
			radius: 360,
		}, {
			isStatic: true,
			friction: 0,
			restitution: 1,
			collisionFilter: {
				category: this.EARTH_CAT,
				mask: this.PHOTON_CAT
			}
		});
		earth.setFriction(0, 0, 0);
		// earth.angle = 140;

		let sun = this.add.image(50, 50, "greenhouseSun");
		sun.scale = 1.5;
		this.sunBounds = sun.getBounds();

		this.curve = new Phaser.Curves.CubicBezier(
			new Phaser.Math.Vector2(10, 600),
			new Phaser.Math.Vector2(180, 240),
			new Phaser.Math.Vector2(620, 240),
			new Phaser.Math.Vector2(790, 600)
		);

		this.matter.world.disableGravity();


		let atmosphereBlocks = [];

		for (let i = 0; i < 25; i++) {
			let point = this.curve.getPoint(0.1 + i * 0.015);
			let tangent = this.curve.getTangent(0.1 + i * 0.015);
			let rect = this.matter.add.rectangle(point.x, point.y, 15, 5, {
				angle: Math.atan(tangent.y / tangent.x),
				isStatic: true,
				friction: 0,
				frictionStatic: 0,
				restitution: 1,
				collisionFilter: {
					group: this.ATMOSPHERE_GROUP,
					category: this.ATMOSPHERE_CAT,
					mask: this.PHOTON_CAT
				}
			});
			atmosphereBlocks.push(rect);
		}
		for (let i = 0; i < 1; i++) {
			let point = this.curve.getPoint(0.68 + i * 0.029);
			let tangent = this.curve.getTangent(0.68 + i * 0.029);
			let rect = this.matter.add.rectangle(point.x, point.y, 65, 5, {
				angle: Math.atan(tangent.y / tangent.x),
				isStatic: true,
				friction: 0,
				frictionStatic: 0,
				restitution: 1,
				collisionFilter: {
					group: this.ATMOSPHERE_GROUP,
					category: this.ATMOSPHERE_CAT,
					mask: this.PHOTON_CAT
				}
			});
			atmosphereBlocks.push(rect);
		}

		//photon that will bounce of atmosphere
		this.addPhoton().setCollidesWith(this.ATMOSPHERE_CAT);
		//photon absorbed by atmosphere
		this.addPhoton().setBounce(1).setCollidesWith(this.ATMOSPHERE_CAT).setOnCollideEnd((collisionData) => {
			let point = this.sunBounds.getRandomPoint();
			collisionData.bodyB.gameObject.setVelocity(2, 3).setPosition(point.x, point.y);
		});
		//photon that bounces off earth
		let photon = this.addPhoton();
		photon.setCollidesWith(this.EARTH_CAT);
		//photon that is absorbed by earth
		this.addPhoton().setCollidesWith(this.EARTH_CAT).setOnCollideEnd((collisionData) => {
			let point = this.sunBounds.getRandomPoint();
			collisionData.bodyB.gameObject.setPosition(point.x, point.y).setVelocity(2, 3);
		});


		//photon that passes through atmosphere
		photon = this.addPhoton().setTint(0xff0000).setPosition(600, 400).setVelocity(1, -1).setCollidesWith(0x0000);
		photon.sunPhoton = false;
		photon.initialX = 600;
		photon.initialY = 400;
		photon.initialVelX = 1;
		photon.initialVelY = -1;

		//photon that bounces off atmosphere
		photon = this.addPhoton().setTint(0xff0000).setPosition(560, 400).setVelocity(0.5, -2).setBounce(1).setCollidesWith(this.ATMOSPHERE_CAT | this.EARTH_CAT)
		.setOnCollideWith(earth, (earth, collisionData) => {
			photon.setPosition(560, 400);
			photon.setVelocity(0.5, -2);
		})
		.setOnCollideEnd((collisionData) => {
			let bodyB = collisionData.bodyB;
			let velocity = Math.sqrt(Math.pow(bodyB.velocity.x, 2) + Math.pow(bodyB.velocity.y, 2));
			// console.log(velocity);
			//set velocity vector length in same direction, with length of 2
			// photon.setVelocity(bodyB.velocity.x * 2 / velocity,  bodyB.velocity.y * 2 / velocity);
			//photon.setVelocity(bodyB.velocity.x * 2,bodyB.velocity.y * 2);
		});

		photon.sunPhoton = false;
		photon.initialX = 560;
		photon.initialY = 400;
		photon.initialVelX = 0.5;
		photon.initialVelY = -2;

		this.add.text(400, 10, "The Greenhouse Effect", {fontSize: "20px"}).setOrigin(0.5, 0);
		this.add.text(50, 180, "Some solar radiation is reflected by or absorbed by the atmosphere. Most reaches the surface and is either absorbed or reflected.", {wordWrap: {width: 100}});
		this.add.text(390, 50, "Some infrared radiation emitted by the surface is absorbed by the atmosphere and reemitted in all directions. Some radiation returns to the surface, warming the Earth. This also warms the atmosphere. Gases like carbon dioxide, methane, and water vapor are especially good at absorbing and remitting infrared radiation, so they are called greenhouse gases. Without an atmosphere, all emitted infrared radiation would go to space and not warm Earth.",
			{
				wordWrap: {width: 380},
				backgroundColor: "#000000aa"
			}
		);	   

		//this.curve = this.add.arc(400, 600, 128, 180, 360);

		


		super.createNavButtons();

		this.graphics = this.add.graphics();
	}

	update() {
		this.graphics.lineStyle(1, 0x00ff00, 1);
		//this.curve.draw(this.graphics);

		for (let photon of this.photons) {
			if (photon.x > 800 || photon.x < 0 || photon.y < 0 || photon.y > 600) {
				if (photon.sunPhoton) {
					photon.setVelocity(2, 3);
					photon.setPosition(50, 50);
				}
				else {
					photon.setVelocity(photon.initialVelX, photon.initialVelY);
					photon.setPosition(photon.initialX, photon.initialY);
				}
			}
		}
	}

}

class CarbonScene extends BaseScene {
	constructor() {
		super("carbon");
	}
	preload() {
		super.preload();
		this.load.image("stars", "assets/images/stars.jpg");
		this.load.image("greenhouseEarth", "assets/images/greenhouse/earth.png");
		this.load.image("greenhouseSun", "assets/images/greenhouse/sun.png");
		this.load.image("atmosphere", "assets/images/greenhouse/atmosphere.png");
		this.load.image("longArrow", "assets/images/carbon/longArrow.png");
		this.load.image("arrow", "assets/images/carbon/arrow.png");
	}

	create() {
		this.add.image(400, 300, "stars");
		this.add.image(50, 50, "greenhouseSun");
		let atmosphere = this.add.image(400, 540, "atmosphere").setScale(1.1);
		this.add.image(400, 760, "greenhouseEarth").scale = 0.9;
		
		this.add.image(135, 210, "longArrow").setTintFill(0xffff00);
		let leavingArrow = this.add.image(460, 370, "arrow").setAngle(30).setScale(0.2, 0.3);
		let returnArrow = this.add.image(400, 360, "arrow").setFlipY(true).setScale(0.2);

		this.tweens.addCounter({
			from: 0,
			to: 100,
			duration: 10000,
			onUpdate: function(tween)
			{
				atmosphere.setTintFill(
					Phaser.Display.Color.ObjectToColor(
						Phaser.Display.Color.Interpolate.RGBWithRGB(255, 255, 255, 50, 50, 50, 1, 1-tween.progress)
						//Phaser.Display.Color.Interpolate.ColorWithRGB(Phaser.Display.Color.GetColor32(30, 30, 30, 0), 255, 255, 255, 1, tween.progress)
					).color
				);
				//atmosphere.setAlpha(1);
			}
		});

		this.tweens.add({
			targets: returnArrow,
			scaleX: 0.8,
			ease: "linear",
			duration: 10000
		});

		this.tweens.add({
			targets: leavingArrow,
			scaleX: 0.1,
			ease: "linear",
			duration: 10000
		});

		this.add.text(300, 350, "Radiation re-\nradiated back\nto Earth");
		this.add.text(470, 350, "Radiation re-radiated\ninto space");

		this.add.text(400, 10, "Carbon Emissions", {fontSize: "20px"}).setOrigin(0.5, 0);

		this.add.text(250, 50, ["\tHuman activities are releasing more greenhouse gases into the atmosphere, especially carbon dioxide. As a result, the greenhouse effect is becoming more powerful: more infrared radiation is being reemitted back to the surface. This is causing less energy to leave the planet, changing the energy balance and warming the planet.",
			"\tThe amount of greenhouse gases released by someone/something is called their carbon footprint. Almost everything you do has a carbon footprint, from driving a car to using electricity. To decrease your carbon footprint and help reduce climate change, you can take various actions like driving less, eating less meat, or buying eco-friendly products. Online carbon footprint calculators can help you."],
			{
				wordWrap: {width: 530},
				backgroundColor: "#000000aa"
			}
		);

		super.createNavButtons();
	}
}

class FeedbackLoopScene extends BaseScene {
	constructor() {
		super("feedbackLoop");
	}
	preload() {
		super.preload();

		this.load.image("ocean", "assets/images/feedback/ocean.jpg");
		this.load.image("arrowIn", "assets/images/feedback/arrow-in.png");
		this.load.image("arrowOut", "assets/images/feedback/arrow-out.png");
		this.load.image("ice1", "assets/images/feedback/ice1.png");
		this.load.image("ice2", "assets/images/feedback/ice2.png");
		this.load.image("ice3", "assets/images/feedback/ice3.png");
		this.load.image("thermometer", "assets/images/feedback/unfilled-thermometer-with-lines.svg");
	}
	create() {
		let shrinkObjects = [];

		this.add.image(400, 300, "ocean");

		//Floating Ice
		shrinkObjects.push(this.add.image(200, 350, "ice1").setScale(0.2));
		shrinkObjects.push(this.add.image(550, 450, "ice2").setScale(0.3));

		//Thermometer
		let tempRect = this.add.rectangle(760, 220, 18, 50, 0xcc0000);
		this.add.image(800, 150, "thermometer").setScale(0.5);
		

		



		this.add.image(180, 340, "arrowIn").setScale(0.5).setTintFill(0xffff00).setOrigin(0.56, 0.95);
		shrinkObjects.push(this.add.image(180, 340, "arrowOut").setScale(0.5).setTintFill(0xffff00).setOrigin(0.56, 0.95));
		this.add.image(530, 440, "arrowIn").setScale(0.5).setTintFill(0xffff00).setOrigin(0.56, 0.95);
		shrinkObjects.push(this.add.image(530, 440, "arrowOut").setScale(0.5).setTintFill(0xffff00).setOrigin(0.56, 0.95));

		this.tweens.add({
			targets: shrinkObjects,
			scale: 0,
			duration: 5000,
			ease: "Expo.easeIn"
		});

		this.tweens.add({
			targets: tempRect,
			y: 100,
			height: 170,
			duration: 5000,
			ease: "Expo.easeIn"
		});

		super.addTitle("Feedback Loops", {fontSize: "20px", color: "black"});
		this.add.text(20, 450, ["Climate change is especially worrying because of feedback loops, self-reinforcing cycles whose effects further exacerbates their cause. This makes the process run faster and faster.",
		"Melting sea ice is an example of this. Ice is normally quite reflective compared to sea water. As temperatures rise, sea ice melts, exposing the darker water, which absorbs more sunlight. This in turn heats up Earth more, melting more ice and speeding up the process. "],
		{
			wordWrap: {
				width: 740
			},
			backgroundColor: "#000000aa"
		});

		super.createNavButtons();
	}
}

class EffectsScene extends BaseScene {
	constructor() {
		super("effects");
	}
	preload() {
		this.load.image("coralAlive", "assets/images/effects/coral-alive.png");
		this.load.image("coralDead", "assets/images/effects/coral-dead.png");
		this.load.image("background", "assets/images/effects/background.png");
		super.preload();
	}

	create() {
		this.add.image(400, 300, "background").setScale(800, 600);
		this.add.image(400, 300, "coralAlive");
		let coralDead = this.add.image(400, 300, "coralDead");

		let tweenForward = true;

		this.tweens.addCounter({
			from: 0,
			to: coralDead.displayWidth,
			duration: 4000,
			//repeatDelay: 1500,
			loopDelay: 1500,
			ease: "Cubic.easeInOut",
			hold: 1500,

			yoyo: true,
			//repeat: -1,
			loop: -1,
			onUpdate: (tween) => {
				if (tweenForward) {
					coralDead.setCrop(0, 0, tween.getValue(), coralDead.displayHeight);
				}
				else {
					coralDead.setCrop(coralDead.displayWidth - tween.getValue(), 0, coralDead.displayWidth, coralDead.displayHeight);
				}
			},
			onYoyo: (tween) => {
				tweenForward = !tweenForward;
			},
			onLoop: (tween) => {
				tweenForward = !tweenForward;
			}
		});

		super.addTitle("Climate Change Effects");
		this.add.text(400, 430, "One effect of climate change is coral bleaching. Coral bleaching occurs when increased temperatures cause the symbiotic algae on corals to produce damaging oxygen molecules. This causes the coral to eject the algae, making the coral appear white. If the coral are without their algae for too long, they will likely die. This is very worrying because coral reefs are a critical marine habitat with 25% of marine biodiversity.", {
			wordWrap: {
				width: 700
			}
		}).setOrigin(0.5, 0);

		super.createNavButtons();
	}
}


var config = {
	type: Phaser.AUTO,
	physics: {
		default: "arcade",
		arcade: {
			debug: true
		},
		matter: {
			debug: true
		}
	},
	width: 800,
	height: 600,
	scene: [MenuScene, EnergyBalanceScene, RadiationScene, AlbedoScene, GreenhouseScene, CarbonScene, FeedbackLoopScene, EffectsScene]
};

var game = new Phaser.Game(config);