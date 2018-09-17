/**
 * @author Mugen87 / https://github.com/Mugen87
 */

const expect = require( 'chai' ).expect;
const YUKA = require( '../../../../build/yuka.js' );

const SeparationBehavior = YUKA.SeparationBehavior;
const Vector3 = YUKA.Vector3;
const Vehicle = YUKA.Vehicle;

describe( 'SeparationBehavior', function () {

	describe( '#calculate()', function () {

		it( 'should produce a force so the vehicle moves aways from its neighbors', function () {

			const vehicle = new Vehicle();
			const separationBehavior = new SeparationBehavior();
			const force = new Vector3();

			const neighbor1 = new Vehicle();
			neighbor1.position.x = 1;
			const neighbor2 = new Vehicle();

			vehicle.neighbors.push( neighbor1 );
			vehicle.neighbors.push( neighbor2 );

			separationBehavior.calculate( vehicle, force );

			expect( force.x ).to.closeTo( - 1, Number.EPSILON );
			expect( force.y ).to.closeTo( 0, Number.EPSILON );
			expect( force.z ).to.closeTo( 0, Number.EPSILON );

		} );

		it( 'should produce no force if the vehicle has no neighbors', function () {

			const vehicle = new Vehicle();
			const separationBehavior = new SeparationBehavior();
			const force = new Vector3();

			separationBehavior.calculate( vehicle, force );

			expect( force.length() ).to.equal( 0 );

		} );

	} );

} );
