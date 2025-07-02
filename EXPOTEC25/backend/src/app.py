from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient, errors
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from modelos import user, company, permit
from flask_cors import CORS
 #Incializando la aplicacion Flask
app = Flask(__name__)
#Configuration the URI Mongo from PyMongo 
app.config['MONGO_URI']='mongodb://localhost/pythonreact'
mongo = PyMongo(app)

CORS(app)
#Conexion a la Base de Datos en Mongo
try:
    db = mongo.db
    user_colection = db["users"]
    company_colection = db["companies"]
    permit_colection = db["permits"]
except errors.ConnectionFailure as e:
    print(f"No se puedo conectar a la BD: {e}")
    db = None
# Helper es una funcion que convierte un ojbeto mongo a un objeto Usuario
def user_to_dict(user):
    return {
        "code": user.get("codigo"),
        "nameUser": user.get("nombre"),
        "lastName": user.get("apellido"),
        "phone": user.get("telefono"),
        "birthDate": user.get("fecha_nacimiento"),
        "gender": user.get("genero"),
        "dpi": user.get("dpi"),
        "rol": user.get("rol"),
        "email": user.get("correo"),
        "password": user.get("password"),
        "laboralData": user.get("datos_laborales"),
        "educationData": user.get("datos_educativos"),
        "status": user.get("estado"),
        "creationDate": user.get("fecha_creacion"),
        "modificationDate": user.get("fecha_modification")

    }
# Helper es una funcion que convierte un ojbeto mongo a un objeto Empresa
def company_to_dict(company):
    return{
        "code": company.get("codigo"),
        "nameCompany": company.get("nombre"),
        "direction": company.get("direccion"), 
        "phone": company.get("telefono"),
        "nit": company.get("nit"), 
        "environment": company.get("entorno"), 
        "sector": company.get("sector"), 
        "email": company.get("correo"), 
        "date": company.get("fecha"), 
        "description": company.get("descripcion"),
        "status": company.get("estado"), 
        "managerRH": company.get("encargadoRH"), 
        "state": company.get("estadoPerteneciente")
    }
# Helper es una funcion que convierte un ojbeto mongo a un objeto Permiso
def permit_to_dict(permit):
    return{
        "administrator": permit.get("administrador"),
        "recruiter": permit.get("reclutador")
    }
# Endpoints
@app.route("/")
def home():
    return "<h1>BACKEND DE RECLUTAMIENTO</h1>"

@app.route("/colecciones")
def obtener_coleccion():
    if db is None:
        return jsonify({"error","No existe conexion a Mongo"}), 500
    colecciones = db.list_collection_names()
    if not colecciones:
        return jsonify({"mensaje": "No hay colecciones"}), 404
    return jsonify(colecciones), 200

#CRUD DE USUARIOS
# Creando un nuevo usuario
@app.route('/adduser', methods=['POST'])
def add_user():
    try:
        # Data es la informacion recibida del frontend en formato JSON

        print("-0-")
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibió JSON válido"}), 400

        print("-1-")
        
        # se crea un objeto para validar la data
        required = ["code", "nameUser", "lastName", "phone", "birthDate", "gender", "dpi", "rol", "email", "password","laboralDate","educationData", "status","creationDate", "modificationDate"]
        print("-2-")
        # Se valida que la data contenga todos los campos requeridos
        if not all(k in data for k in required):
            return jsonify({"error": "Faltan campos requeridos"}), 400
        print("-3-")
        # Validacion para ver si existe o no
        user_exist = user_colection.find_one({"dpi": data["dpi"]})
        if user_exist:
            return jsonify({"error": "El usuario ya existe"}), 400
        print("-4-")
        # El usuario que viene en la data, viene completo y no existe en nuestra coleccion
        result = user_colection.insert_one(data)
        return jsonify({"mensaje": "Usuario agregado", "dpi": str(data["dpi"])}), 201
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Leer un usuario (Mostrar un usuario)
@app.route('/showuser/<string:dpi>', methods=['GET'])
def show_user(dpi):
    if db is None:
        return jsonify({"error": "No existe conexion a Mongo"}), 500
    usuario = user_colection.find_one({"dpi": dpi})
    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404
    
    return jsonify(user_to_dict(usuario)), 200

# Eliminar un usuario
@app.route('/deleteuser/<string:dpi>', methods=['DELETE'])
def delete_user(dpi):
    try:
        user = user_colection.find_one({"dpi": dpi})
        
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        result = user_colection.delete_one({"dpi": dpi})
        
        if result.deleted_count == 1:
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"error": "No se pudo eliminar el usuario"}), 500
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Actualizar un usuario
@app.route('/updateuser/<string:dpi>', methods=['PUT'])
def update_user(dpi):
    try:
        # Los Datoss recibimos en formato JSON
        data = request.json
        #Verificamos que la data no este vacia
        # y que contenga al menos un campo para actualizar
        if not data:
            return jsonify({"error": "No se recibieron datos para actualizar"}), 400
        
        # Verificamos que el dpi ya existe en la coleccion
        user = user_colection.find_one({"dpi":dpi})
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
        # Si el usuario existe, actualizamos los campos que se enviaron en la data
        result = user_colection.update_one({"dpi": dpi}, {"$set": data})
        
        if result.modified_count == 1:
            return jsonify({"mensaje": "Usuario actualizado"}), 200 
        else:
            return jsonify({"error": "No se pudo actualizar el usuario"}), 500
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)

#CRUD DE EMPRESAS
# Creando una nueva empresa
@app.route('/addcompany', methods=['POST'])
def add_company():
    try:
        # Data es la informacion recibida del frontend en formato JSON

        print("-0-")
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibió JSON válido"}), 400

        print("-1-")
        
        # se crea un objeto para validar la data
        required = ["code", "nameCompany", "direction", "phone", "nit", "environment", "sector", "email", "date", "description", "status", "managerRH", "state"]
        print("-2-")
        # Se valida que la data contenga todos los campos requeridos
        if not all(k in data for k in required):
            return jsonify({"error": "Faltan campos requeridos"}), 400
        print("-3-")
        # Validacion para ver si existe o no
        company_exist = company_colection.find_one({"nit": data["nit"]})
        if company_exist:
            return jsonify({"error": "La empresa ya existe"}), 400
        print("-4-")
        # La empresa que viene en la data, viene completa y no existe en nuestra coleccion
        result = company_colection.insert_one(data)
        return jsonify({"mensaje": "Empresa agregada", "nit": str(data["nit"])}), 201
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Leer una empresa (Mostrar una empresa)
@app.route('/showcompany/<string:nit>', methods=['GET'])
def show_company(nit):
    if db is None:
        return jsonify({"error": "No existe conexion a Mongo"}), 500
    company = company_colection.find_one({"nit": nit})
    if not company:
        return jsonify({"error": "Empresa no encontrada"}), 404
    
    return jsonify(company_to_dict(company)), 200

# Eliminar una empresa
@app.route('/deletecompany/<string:nit>', methods=['DELETE'])
def delete_company(nit):
    try:
        company = company_colection.find_one({"nit": nit})
        
        if not company:
            return jsonify({"error": "Empresa no encontrada"}), 404
        result = company_colection.delete_one({"nit": nit})
        
        if result.deleted_count == 1:
            return jsonify({"mensaje": "Empresa eliminada"}), 200
        else:
            return jsonify({"error": "No se pudo eliminar la empresa"}), 500
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Actualizar una empresa
@app.route('/updatecompany/<string:nit>', methods=['PUT'])
def update_company(nit):
    try:
        # Los Datoss recibimos en formato JSON
        data = request.json
        #Verificamos que la data no este vacia
        # y que contenga al menos un campo para actualizar
        if not data:
            return jsonify({"error": "No se recibieron datos para actualizar"}), 400
        
        # Verificamos que el nit ya existe en la coleccion
        company = company_colection.find_one({"nit":nit})
        if not company:
            return jsonify({"error": "Empresa no encontrada"}), 404
        
        # Si la empresa existe, actualizamos los campos que se enviaron en la data
        result = company_colection.update_one({"nit": nit}, {"$set": data})
        
        if result.modified_count == 1:
            return jsonify({"mensaje": "Empresa actualizada"}), 200 
        else:
            return jsonify({"error": "No se pudo actualizar la empresa"}), 500
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#CRUD DE PERMISOS
# Creando una nuevo permiso
@app.route('/addpermit', methods=['POST'])
def add_permit():
    try:
        # Data es la informacion recibida del frontend en formato JSON

        print("-0-")
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se recibió JSON válido"}), 400

        print("-1-")
        
        # se crea un objeto para validar la data
        required = ["code","administrator", "recruiter", "employee", "createDate", "modificationDate"]
        print("-2-")
        # Se valida que la data contenga todos los campos requeridos
        if not all(k in data for k in required):
            return jsonify({"error": "Faltan campos requeridos"}), 400
        print("-3-")
        # Validacion para ver si existe o no
        company_exist = company_colection.find_one({"code": data["code"]})
        if company_exist:
            return jsonify({"error": "El permiso ya existe"}), 400
        print("-4-")
        # El permiso que viene en la data, viene completo y no existe en nuestra coleccion
        result = company_colection.insert_one(data)
        return jsonify({"mensaje": "Permiso agregado", "code": str(data["code"])}), 201
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Leer un permiso (Mostrar un permiso)
@app.route('/showpermit/<string:code>', methods=['GET'])
def show_permit(code):
    if db is None:
        return jsonify({"error": "No existe conexion a Mongo"}), 500
    permit = permit_colection.find_one({"code": code})
    if not permit:
        return jsonify({"error": "Empresa no encontrada"}), 404
    
    return jsonify(permit_to_dict(permit)), 200

# Eliminar un permiso
@app.route('/deletepermit/<string:code>', methods=['DELETE'])
def delete_permit(code):
    try:
        permit = permit_colection.find_one({"code": code})
        
        if not permit:
            return jsonify({"error": "Permiso no encontrado"}), 404
        result = permit_colection.delete_one({"code": code})
        
        if result.deleted_count == 1:
            return jsonify({"mensaje": "Permiso eliminado"}), 200
        else:
            return jsonify({"error": "No se pudo eliminar el permiso"}), 500
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Actualizar un permiso
@app.route('/updatepermit/<string:code>', methods=['PUT'])
def update_permit(code):
    try:
        # Los Datoss recibimos en formato JSON
        data = request.json
        #Verificamos que la data no este vacia
        # y que contenga al menos un campo para actualizar
        if not data:
            return jsonify({"error": "No se recibieron datos para actualizar"}), 400
        
        # Verificamos que el codigo ya existe en la coleccion
        permit = permit_colection.find_one({"code":code})
        if not permit:
            return jsonify({"error": "Permiso no encontrado"}), 404
        
        # Si el permiso existe, actualizamos los campos que se enviaron en la data
        result = permit_colection.update_one({"code": code}, {"$set": data})
        
        if result.modified_count == 1:
            return jsonify({"mensaje": "Permiso actualizado"}), 200 
        else:
            return jsonify({"error": "No se pudo actualizar el permiso"}), 500
    except errors.PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500