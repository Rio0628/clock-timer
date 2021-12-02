const Session = require('../models/session-model');

createSession = ( req, res ) => {
    const body = req.body;

    if (!body) { 
        return res.status(400).json({
            success: false,
            error: "You must provide a session",
        })
    }

    const session = new Session(body);

    if (!session) { return res.status(400).json({ success: false, error: err }) };

    session.save().then(() => {
        return res.status(201).json({
            success: true,
            id: session._id,
            message: "Session created!",
        })
    }).catch( error => { return res.status(400).json({ error, message: "Session not created!", }) });
}

deleteSession = async ( req, res ) => {
    await Session.findOneAndDelete({ _id: req.params.id }, ( err, session ) => {
        if (err) { return res.status(400).json({ success: false, error: err })}
    
        if (!session) { return res.status(404).json({ success: false, error: `Session not found`}) };

        return res.status(200).json({ success: true, data: session })
    }).catch( err => console.log(err) );
}

getSessionById = async ( req, res ) => {
    await Session.findOne({ _id: req.params.id }, ( err, session ) => {
        if (err) { return res.status(400).json({ success: false, error: err }) }; 
    
        if (!session) { return res.status(404).json({ success: false, error: 'Session not found' }) };

        return res.status(200).json({ success: true, data: session })
    }).catch( err => console.log(err) );
}

getSessions = async ( req, res ) => {
    await Session.find({}, ( err, sessions ) => {
        if (err) { return res.status(400).json({ success: false, error: err }) };

        if (!sessions.length) { return res.status(404).json({ success: false, error: 'Sessions not found' }) };

        return res.status(200).json({ success: true, data: sessions });
    }).catch( err => console.log(err) );
}

module.exports = { createSession, deleteSession, getSessionById, getSessions };