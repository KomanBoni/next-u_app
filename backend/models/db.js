const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('next-u app', 'postgres', 'KomanKali12', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false,
    }
});


sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    entrance_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'users',
});

const Student = sequelize.define('Student', {
    users_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    student_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    badges: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
}, {
    tableName: 'student',
});


const Admin = sequelize.define('Admin', {
    users_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    registration_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    job: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'admin',
});


const Article = sequelize.define('Article', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    description: {
        type: DataTypes.TEXT,
    }
}, {
    tableName: 'articles',
});

const Media = sequelize.define('Media', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Article,
            key: 'id'
        }
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    url_media: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'media',
});


const Sondage = sequelize.define('Sondage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Article,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'sondages',
});


const Reponse = sequelize.define('Reponse', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sondage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Sondage,
            key: 'id'
        }
    },
    text: {
        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    tableName: 'reponses',
});


const Vote = sequelize.define('Vote', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reponse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Reponse,
            key: 'id'
        }
    }
}, {
    tableName: 'votes',
});


User.hasOne(Student, { foreignKey: 'users_id', onDelete: 'CASCADE' });
User.hasOne(Admin, { foreignKey: 'users_id', onDelete: 'CASCADE' });

Article.hasMany(Media, { foreignKey: 'article_id', onDelete: 'CASCADE' });
Media.belongsTo(Article, { foreignKey: 'article_id' });

Article.hasMany(Sondage, { foreignKey: 'article_id', onDelete: 'CASCADE' });
Sondage.belongsTo(Article, { foreignKey: 'article_id' });

Sondage.hasMany(Reponse, { foreignKey: 'sondage_id', onDelete: 'CASCADE' });
Reponse.belongsTo(Sondage, { foreignKey: 'sondage_id' });

Reponse.hasMany(Vote, { foreignKey: 'reponse_id', onDelete: 'CASCADE' });
Vote.belongsTo(Reponse, { foreignKey: 'reponse_id' });

module.exports = { sequelize, User, Student, Admin, Article, Media, Sondage, Reponse, Vote };
