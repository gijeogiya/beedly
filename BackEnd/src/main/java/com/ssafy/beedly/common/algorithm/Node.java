package com.ssafy.beedly.common.algorithm;

public class Node implements Comparable<Node>{
    public final double distance;
    public final Long productId;

    public Node(double distance, Long productId) {
        this.distance = distance;
        this.productId = productId;
    }

    @Override
    public int compareTo(Node p) {
        if(this.distance > p.distance) {
            return 1;
        }
        else if(this.distance == p.distance) {
            if(this.productId > p.productId) {
                return 1;
            }
        }
        return -1;
    }
}