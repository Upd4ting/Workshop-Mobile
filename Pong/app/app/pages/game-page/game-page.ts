import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { GameModel } from "./game-view-model";
import { World, Entity, Vector2, OBB, CollisionResponse, Shape, Component, CircleShape, CubeShape, ImageShape } from 'nativescript-tinyengine';
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import { GestureTypes, TouchGestureEventData } from "tns-core-modules/ui/gestures";

export class BallComponent implements Component {

    public onStart(entity: Entity): void {
        
    }

    public onUpdate(entity: Entity): void {
        let world = entity.getWorld();

        let eWidth = entity.getShape().getWidth();
        let eHeight = entity.getShape().getHeight();

		// Collide with borders
        if (entity.getPosition().getX() < 0 || entity.getPosition().getX() + eWidth > world.getWidth()) {
			entity.setVelocity(new Vector2(-entity.getVelocity().getX(), entity.getVelocity().getY()));
        } 

		// Pad didn't catch the ball, we got the ball back to the center
        if (entity.getPosition().getY() < -eHeight || entity.getPosition().getY() > world.getHeight() + eHeight) {
			entity.setPosition(new Vector2(140, 140));
			entity.setVelocity(getRandomDir());
        } 
    }

    public onCollide(collider: Entity, collided: Entity) {
		collider.setVelocity(new Vector2(collider.getVelocity().getX(), -collider.getVelocity().getY()));
		collider.setVelocity(collider.getVelocity().multiply(1.3, 1.3));
    }

    public onDestroy(entity: Entity): void {

    }

    public getClassName(): string {
        return "BallComponent";
    }
}

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
	page.bindingContext = new GameModel();
	
	let container: LayoutBase = page.getViewById("container");
 
	let world: World = new World(container, 300, 300);

	// We add the pad for each player
	let pad1: Entity = new Entity(new Vector2(130, 0), new Vector2(0, 0), 0, new CubeShape(40, 20, '#000000'));
	world.addEntity(pad1);
	makeMoveEvent(pad1);
	let pad2: Entity = new Entity(new Vector2(130, 280), new Vector2(0, 0), 0, new CubeShape(40, 20, '#000000'));
	world.addEntity(pad2);
	makeMoveEvent(pad2);

	// We add our ball
	let ball: Entity = new Entity(new Vector2(140, 140), getRandomDir(), 0, new CircleShape(10, '#FFFFFF'));
	ball.setCollisionResponse(CollisionResponse.COLLIDE);
	ball.addComponent(BallComponent);
	world.addEntity(ball);

	setInterval(function () { world.tick(); }, 20);
}

// Make sure we are able to move the pad
function makeMoveEvent(ent: Entity): void {
	const shape = <CubeShape>ent.getShape();
	shape.getImg().on(GestureTypes.touch, function (args: TouchGestureEventData) {
		let newX = ent.getPosition().getX() + args.getX() - 20;

		if (newX < 0) {
			newX = 0;
		} else if (newX > 300 - 40) {
			newX = 300 - 40;
		}

		ent.setPosition(new Vector2(newX, ent.getPosition().getY()));
	});
}

// Get a random vector direction
function getRandomDir(): Vector2 {
	let x = (Math.random() - 0.5) / 5;
	let y = (Math.random() - 0.5) / 5;

	// Trying to not have an y too low
	if (y < 0 && y > -0.15) {
		y = -0.15;
	} else if (y > 0 && y < 0.15) {
		y = 0.15;
	}

	let vec = new Vector2(x, y);
	return vec.normalize().multiply(0.07, 0.07);
}