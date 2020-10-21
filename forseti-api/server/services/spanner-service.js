const {
    Spanner
} = require('@google-cloud/spanner');
var fs = require('fs')

let projectId = 'elevated-watch-270607'
let instanceId = 'spanner-instance'
let databaseId = 'spanner-database'

// Creates a client
const spanner = new Spanner({
    projectId
});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

async function healthCheck() {
    // The query to execute
    const query = {
        sql: 'SELECT 1',
    };

    // Execute a simple SQL statement
    const [rows] = await database.run(query);
    console.log(`Query: ${rows.length} found.`);
    rows.forEach(row => console.log(row));
}


async function getIamPolicies() {
    // The query to execute
    const query = {
        sql: 'SELECT * FROM IamPolicy',
    };

    // Execute a simple SQL statement
    const [rows] = await database.run(query);
    console.log(`Query: ${rows.length} found.`);

    
    try {
        fs.unlinkSync('output_data/IamPolicy.json');
    } catch {}

    rows.forEach(row => {
        console.log(row);
        
        fs.appendFile('output_data/IamPolicy.json', JSON.stringify(row) + '\n', function (err) {
            if (err) {
                // append failed
            } else {
                // done
            }
        })
    });


}


async function getConstraints() {
    // The query to execute
    const query = {
        sql: 'SELECT * FROM Constraints',
    };

    // Execute a simple SQL statement
    const [rows] = await database.run(query);
    console.log(`Query: ${rows.length} found.`);
    rows.forEach(row => console.log(row));
}

(async () => {
    try {
        console.log('next');
        await healthCheck();

        await getIamPolicies();

        await getConstraints();
    } catch (e) {
        // Deal with the fact the chain failed
    }
})();