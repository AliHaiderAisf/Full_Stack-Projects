import Stat from "../models/Stat.js";

export const getStats = async (req, res) => {
  const stats = await Stat.find({ userId: req.user.id });
  res.json(stats);
};

export const getStat = async (req, res) => {
  try {
    const stat = await Stat.findOne({ _id: req.params.id, userId: req.user.id });
    
    if (!stat) {
      return res.status(404).json({ message: 'Stat not found' });
    }

    res.status(200).json(stat);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createStat = async (req, res) => {
  const { title, value } = req.body;

  const stat = new Stat({
    userId: req.user.id,
    title,
    value,
  });

  await stat.save();
  res.status(201).json(stat);
};

export const updateStat = async (req, res) => {
  const stat = await Stat.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id,
    },
    req.body,
    { new: true }
  );
  res.json(stat);
};

export const deleteStat = async (req, res) => {
  await Stat.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });
  res.json({ message: "Stat deleted successfully" });
};
