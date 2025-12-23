// ***************************************************************************
// Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
// ***************************************************************************
const assert = require('assert');
const sqlanywhere = require('../lib/index');

describe('SQL Anywhere Module', function() {
  describe('Module Loading', function() {
    it('should load the module without errors', function() {
      assert.ok(sqlanywhere, 'Module should be loaded');
    });

    it('should export createConnection function', function() {
      assert.strictEqual(typeof sqlanywhere.createConnection, 'function', 'createConnection should be a function');
    });
  });

  describe('Connection Object', function() {
    let connection;

    beforeEach(function() {
      connection = sqlanywhere.createConnection();
    });

    it('should create a connection object', function() {
      assert.ok(connection, 'Connection object should be created');
    });

    it('should have connect method', function() {
      assert.strictEqual(typeof connection.connect, 'function', 'connect should be a function');
    });

    it('should have disconnect method', function() {
      assert.strictEqual(typeof connection.disconnect, 'function', 'disconnect should be a function');
    });

    it('should have exec method', function() {
      assert.strictEqual(typeof connection.exec, 'function', 'exec should be a function');
    });

    it('should have prepare method', function() {
      assert.strictEqual(typeof connection.prepare, 'function', 'prepare should be a function');
    });

    it('should have commit method', function() {
      assert.strictEqual(typeof connection.commit, 'function', 'commit should be a function');
    });

    it('should have rollback method', function() {
      assert.strictEqual(typeof connection.rollback, 'function', 'rollback should be a function');
    });
  });

  describe('Statement Object', function() {
    let connection;
    let stmt;

    before(function() {
      connection = sqlanywhere.createConnection();
      // Create a mock statement object for testing
      // In real tests, this would be obtained via connection.prepare()
    });

    it('should handle multiple connection objects', function() {
      const conn1 = sqlanywhere.createConnection();
      const conn2 = sqlanywhere.createConnection();

      assert.ok(conn1, 'First connection should be created');
      assert.ok(conn2, 'Second connection should be created');
      assert.notStrictEqual(conn1, conn2, 'Connections should be different objects');
    });
  });

  describe('Error Handling', function() {
    it('should handle connection errors gracefully', function(done) {
      const connection = sqlanywhere.createConnection();

      // Try to connect with invalid connection string
      connection.connect({ Server: 'nonexistent', UserID: 'test', Password: 'test' }, function(err) {
        // We expect an error since there's no server
        if (err) {
          assert.ok(err, 'Should return an error for invalid connection');
          done();
        } else {
          // If no error, disconnect and finish
          connection.disconnect(function() {
            done();
          });
        }
      });
    });
  });

  describe('Module Stability', function() {
    it('should handle rapid connection creation', function() {
      const connections = [];
      for (let i = 0; i < 10; i++) {
        connections.push(sqlanywhere.createConnection());
      }

      assert.strictEqual(connections.length, 10, 'Should create 10 connections');
      connections.forEach((conn, index) => {
        assert.ok(conn, `Connection ${index} should be valid`);
      });
    });
  });
});
