import pymongo


def get_mongo_db():
    connection = pymongo.MongoClient('ds119795.mlab.com', 19795)
    db = connection['se_project']
    db.authenticate('chain', 'chainlor123')

    return db


mongo_db = get_mongo_db()
# mongo_collection = db.get_collection(table_name)
# query = collection.find_one(condition)
