import numpy as np
from sentence_transformers import SentenceTransformer


model =SentenceTransformer('all-miniLM-L6-v2')


def process_search(search):
    if search:
        search_list = search.split(',')
        search_vectors = model.encode(search_list)
        search_vector = search_vectors.mean(axis=0)
        return search_vector
def combine_user_with_search(user_data):
    combined_text = f"user_id :{user_data['user_id']},"\
                    f"product : {user_data['product']},"
    uservector = model.encode(combined_text)
    search_vector = process_search(user_data['search'])
    if search_vector is not None:
        combined_vector = uservector + search_vector
    else:
        combined_vector = uservector

    return combined_vector


def vectorize_data(df):
    uservectors = []
    for _, user in df.iterrows():
        uservector= combine_user_with_search(user)
        uservectors.append(uservector)
    return uservector

