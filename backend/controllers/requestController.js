import Request from '../models/Request.js';
export const createRequest = async (req, res) => {
  try {
    const body = req.body;
    const imagePath = req.file ? '/uploads/' + req.file.filename : null;
    const newReq = new Request({
      requesterId: body.requesterId || null,
      requesterName: body.requesterName || body.name || 'Anonymous',
      phone: body.phone,
      need: body.need,
      location: body.location,
      details: body.details,
      image: imagePath
    });
    await newReq.save();
    res.json(newReq);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
export const getAllRequests = async (req, res) => {
  try {
    const all = await Request.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
export const addResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { volunteerName, volunteerContact, message } = req.body;
    const reqDoc = await Request.findById(id);
    if (!reqDoc) return res.status(404).json({ message: 'Request not found' });
    reqDoc.responses.push({ volunteerName, volunteerContact, message });
    reqDoc.status = 'Accepted';
    await reqDoc.save();
    res.json(reqDoc);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
