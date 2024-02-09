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

        let updatePostStub;
    
        beforeEach(() => {
            // before every test case, set up the response object
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // executed after each test case
            updatePostStub.restore();
        });


        it("should return the updated post object", () => {
            // this is the newly updated post
            const expectedUpdatedPost = {
                _id: '507asdghajsdhjgasd',
                title: 'just updated',
                content: 'new content',
                author: 'newuser',
                date: Date.now()
            }

            req.params.id = expectedUpdatedPost._id
            req.body = {
                title: expectedUpdatedPost.title,
                content: expectedUpdatedPost.content,
                author: expectedUpdatedPost.author
            }
            
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedUpdatedPost);

            PostController.update(req,res);

            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body);
            sinon.assert.calledWith(res.json, sinon.match(expectedResult));
        });  
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