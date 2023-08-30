const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: req.body },
      { runValidators: true, new: true })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    const { reactionBody, username } = req.body;

    // Create a new reaction using the Reaction schema
    const newReaction = {
      reactionBody,
      username,
    };

    // Find the thought by its ID and push the new reaction
    Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: newReaction } },
      { new: true }
    )
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction
deleteReaction(req, res) {
  const reactionIdToDelete = req.params.reactionId;

  // Find the thought by its ID and remove the specific reaction
  Thought.findByIdAndUpdate(
    req.params.thoughtId,
    { $pull: { reactions: { _id: reactionIdToDelete } } },
    { new: true }
  )
    .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    })
    .catch((err) => res.status(500).json(err));
},
};
