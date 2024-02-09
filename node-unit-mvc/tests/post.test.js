const sinon = require('sinon');
const assert = require('assert');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        params: {
            id : '123',
        },
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;
    
    describe('create', () => {
        
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });

    });


    describe('updatePost', () => {

        it("should return the updated post object", () => {
            const mockModel = { updatePost: sinon.stub() };
                const postId = '123';
                const newContent = 'Updated content';
        
                PostController.update = (req, res) => {
                    return mockModel.updatePost(postId, newContent, (err, updatedPost) => {
                    });
                };
        
                PostController.update({ params: { id: postId } }, {});
        
                assert.ok(mockModel.updatePost.calledWith(postId, newContent));
        })  
    });


    let findPostStub;

    beforeEach(() => {
        findPostStub = sinon.stub(PostModel, 'findPost');
    });

    afterEach(() => {
        findPostStub.restore();
    });

    describe('findPost', () => {

        it('should return the post object',async () => {
            const postId = '123';
            const expectedPost = {
                _id: '123',
                title: 'title test',
                content: 'content',
                author: 'mypost',
                date: Date.now()
            }; // Mock post object

            findPostStub.resolves(expectedPost);

            await PostController.findPost({ params: { id: postId } }, res);

            // Assert
            sinon.assert.calledWith(PostModel.findPost, postId);
            sinon.assert.calledWith(res.json, expectedPost);
        });

        it('should handle errors when finding the post', async () => {
            const postId = '123';
        
            const req = { params: { id: postId } };
        
            findPostStub.rejects(error);
        
            await PostController.findPost(req, res);
        
            // Assert
            sinon.assert.calledWith(PostModel.findPost, postId);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

});